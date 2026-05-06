import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { type Request, type Response } from "express";
import { prisma } from "../lib/prisma";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET!;

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const existedEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existedEmail) {
      return res.status(400).json({ message: "The email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const firstUser = (await prisma.user.count()) === 0;

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        isAdmin: firstUser,
      },
    });

    const token = jwt.sign({ userId: newUser.user_id }, JWT_SECRET, {
      expiresIn: "1hr",
    });

    res
      .cookie("accesToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
        maxAge: 60 * 60 * 1000,
      })
      .status(201)
      .json({ message: "User registered succesfully" });

    return res.json({ newUser: newUser });

    //
  } catch (error) {
    res.status(500).json({message: "User registration failed" })
  }
};
