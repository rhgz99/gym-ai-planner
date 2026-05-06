import { Router } from "express";
import { registerUser } from "../controllers/authControllers";

export const authRouter = Router();

authRouter.post('/register', registerUser)