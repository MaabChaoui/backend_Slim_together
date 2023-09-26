require("dotenv").config();
import express, { Response } from "express";
import config from "config";
import validateEnv from "./utils/validateEnv";
import { AppDataSource } from "./utils/data-source";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/routes.index";
//import redisClient from './utils/connectRedis';

AppDataSource.initialize()
  .then(async () => {
    // VALIDATE ENV
    validateEnv();

    const app = express();
    app.use('/api/', router)
    // MIDDLEWARE
    app.use(bodyParser.json())

    // 1. Body parser

    // 2. Logger

    // 3. Cookie Parser

    // 4. Cors
    //app.use(cors)
    // ROUTES

    // HEALTH CHECKER
    app.get("/api/healthchecker", async (_, res: Response) => {
      const message = "here we go";
      res.status(200).json({
        status: "success",
        message,
      });
    });

    // UNHANDLED ROUTE

    // GLOBAL ERROR HANDLER

    const port = config.get<number>("port");
    app.listen(port);

    console.log(`Server started on port: ${port}`);
  })
  .catch((error) => console.log(error));
