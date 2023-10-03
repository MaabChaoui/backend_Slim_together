require("dotenv").config();
import express, { Request, Response } from "express";
import config from "config";
import validateEnv from "./utils/validateEnv";
import { AppDataSource } from "./utils/data-source";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/routes.index";
import { postgresConfig } from "./utils/data-source";

AppDataSource.initialize()
  .then(async () => {
    // VALIDATE ENV
    validateEnv();

    const app = express();

    // MIDDLEWARE
    var escapeHtml = require("escape-html");

    const session = require("express-session");
    app.use(
      session({
        // bad practice but well such is life
        store: new (require("connect-pg-simple")(session))({
          // Insert connect-pg-simple options here
          conObject: {
            connectionString: `postgresql://${postgresConfig.username}:${postgresConfig.password}@${postgresConfig.host}:${postgresConfig.port}/${postgresConfig.database}`,
          },
        }),
        secret: "1234567890",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
      })
    );
    //test sesstion:
    app.get("/startSession", (req, res) => {
      const { username } = req.body;

      // @ts-ignore
      req.session.username = username;

      res.status(200).send("welcome, " + escapeHtml(username));
    });
    app.get("/login", (req, res) => {
      // @ts-ignore
      if (!req.session || !req.session.username) {
        res.status(401).send("<h1>fuck off</h1>");
      } else {
        //@ts-ignore
        res.status(200).send(
          "looks like your session is good, " +
            // @ts-ignore
            escapeHtml(req.session.username)
        );
      }
    });

    // 1. Body parser
    app.use(bodyParser.json());

    // 2. Logger

    // 3. Cookie Parser

    // 4. Cors
    app.use(cors());

    // ROUTES
    app.use("/api/", router);

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
