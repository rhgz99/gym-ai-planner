import { Router } from "express";
import {
  loginUser,
  logoutUser,
  getUser,
  registerUser,
} from "../controllers/authControllers";

export const authRouter = Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

authRouter.post("/logout", logoutUser);

authRouter.get("/user", getUser);
