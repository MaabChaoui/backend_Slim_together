import { NextFunction, Request, Response } from "express";
import { findUserById } from "../services/user.service";
import AppError from "../utils/appError";
import redisClient from "../utils/connectRedis";
import { verifyJwt } from "../utils/jwt";
import { findDoctorById } from "../services/doctor.service";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let access_token;
    console.log("req.headers:", req.headers);
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      access_token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    if (!access_token) {
      console.log("no access token");
      return next(new AppError(401, "You are not logged in"));
    }

    // Validate the access token
    const decoded = verifyJwt<{ sub: string }>(
      access_token,
      "accessTokenPublicKey"
    );

    if (!decoded) {
      return next(new AppError(401, `Invalid token or user doesn't exist`));
    }

    // Check if the user has a valid session
    const session = await redisClient.get(decoded.sub);

    if (!session) {
      return next(new AppError(401, `Invalid token or session has expired`));
    }

    // Check if the user still exist
    const user = await findUserById(JSON.parse(session).id);

    if (!user) {
      return next(new AppError(401, `Invalid token or session has expired`));
    }

    // Add user to res.locals
    res.locals.user = user;
    //console.log("res.locals.user: ", user);
    next();
  } catch (err: any) {
    next(err);
  }
};

export const deserializeDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let access_token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      access_token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    if (!access_token) {
      return next(new AppError(401, "You are not logged in"));
    }

    // Validate the access token
    const decoded = verifyJwt<{ sub: string }>(
      access_token,
      "accessTokenPublicKey"
    );

    if (!decoded) {
      return next(new AppError(401, `Invalid token or account doesn't exist`));
    }

    // Check if the user has a valid session
    const session = await redisClient.get(decoded.sub);

    if (!session) {
      return next(new AppError(401, `Invalid token or session has expired`));
    }

    // Check if the user still exist
    const doctor = await findDoctorById(JSON.parse(session).id);

    if (!doctor) {
      return next(new AppError(401, `Invalid token or session has expired`));
    }

    // Add user to res.locals
    res.locals.doctor = doctor;
    console.log("deserializeDoctor:\nres.locals.doctor: ", doctor);
    next();
  } catch (err: any) {
    next(err);
  }
};
