import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//Routes

app.use("/api/auth", authRouter)

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT} `);
});
