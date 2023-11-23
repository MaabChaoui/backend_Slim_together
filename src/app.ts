require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import config from "config";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { AppDataSource } from "./utils/data-source";
import AppError from "./utils/appError";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import docorRouter from "./routes/doctor.routes";
import validateEnv from "./utils/validateEnv";
import redisClient from "./utils/connectRedis";
import { IJoinRoom } from "./interfaces/socket.interfaces";

const { Server } = require("socket.io");

AppDataSource.initialize()
  .then(async () => {
    // VALIDATE ENV
    validateEnv();

    const app = express();

    // TEMPLATE ENGINE

    // MIDDLEWARE

    // 1. Body parser
    app.use(express.json({ limit: "10kb" }));

    // 2. Logger
    if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

    // 3. Cookie Parser
    app.use(cookieParser());

    // 4. Cors
    app.use(
      cors({
        origin: config.get<string>("origin"),
        credentials: true,
      })
    );

    // ROUTES
    app.use("/api/auth", authRouter);
    app.use("/api/users", userRouter);
    app.use("/api/doctor", docorRouter);

    // HEALTH CHECKER
    app.get("/api/healthChecker", async (_, res: Response) => {
      const message = await redisClient.get("try");

      res.status(200).json({
        status: 200,
        message,
      });
    });

    // UNHANDLED ROUTE
    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(new AppError(404, `Route ${req.originalUrl} not found`));
    });

    // GLOBAL ERROR HANDLER
    app.use(
      (error: AppError, req: Request, res: Response, next: NextFunction) => {
        error.status = error.status || "error";
        error.statusCode = error.statusCode || 500;

        res.status(error.statusCode).json({
          status: error.status,
          message: error.message,
        });
      }
    );

    const port = config.get<number>("port");
    const origin = config.get<string>("nextPublicURL");

    // Websocket
    const http = require("http");
    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: origin,
        methods: ["GET", "POST", "DELETE", "PUT"],
      },
    });

    io.on("connection", (socket: any) => {
      console.log(`User connected with socket.id: ${socket.id}`);

      //instead of any, should be an IJoinRoom interface
      socket.on("userJoinRoom", (data: IJoinRoom) => {
        const { roomID } = data;
        socket.join(roomID);
        console.log(`User with id ${socket.id} joined room ${roomID}`)
      });

      socket.on("disconnet", () => {
        console.log(`User disconnected with id: ${socket.id}`);
      });
    });

    server.listen(port);

    console.log(`Server started on port: ${port}`);
  })
  .catch((error) => console.log(error));
