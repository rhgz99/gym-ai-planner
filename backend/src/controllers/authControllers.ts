import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { type Request, type Response } from "express";
import { prisma } from "../lib/prisma";
import {
  AuthResponse,
  ErrorResponse,
  LoginBody,
  RegisterBody,
} from "../../types";

export const registerUser = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response<AuthResponse | ErrorResponse>,
) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existedEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existedEmail) {
      return res.status(400).json({ message: "Email already exist" });
    }

    const isFirstUser = (await prisma.user.count()) === 0;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        isAdmin: isFirstUser,
      },
    });

    const JWT_SECRET = process.env.JWT_SECRET!;
    const token = jwt.sign({ userId: newUser.user_id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const userData = {
      id: newUser.user_id,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    };

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      })
      .status(201)
      .json({ user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Register failed" });
  }
};

export const loginUser = async (
  req: Request<{}, {}, LoginBody>,
  res: Response<AuthResponse | ErrorResponse>,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Email or Password are invalid" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ message: "Email or password are invalid" });
    }

    const userData = {
      id: user.user_id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const JWT_SECRET = process.env.JWT_SECRET!;
    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 60 * 60 * 1000,
      })
      .status(200)
      .json({ user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login Failed" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      })
      .status(200)
      .json({ message: "Logout sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Logout failed" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: {
        user_id: decoded.userId,
      },
    });

    res.status(200).json({
      user: {
        id: user.user_id,
        email: user.email,
        isAdmin: user.isAdmin,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};
