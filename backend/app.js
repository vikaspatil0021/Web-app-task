import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import { setServers } from "node:dns/promises";

import { connectDB } from "./configs/mongodb.js";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import taskRoutes from "./routes/task.route.js";

import { authenticate } from "./middlewares/auth.middleware.js";

dotenv.config();

setServers(["1.1.1.1", "8.8.8.8"]); //mongoDB srv config for current node dns system
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(authenticate); //verify token

app.use("/api/profile", userRoutes);
app.use("/api/task", taskRoutes);

export default app;
