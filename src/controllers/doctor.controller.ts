import { NextFunction, Request, Response } from "express";
import { findAllUsers } from "../services/user.service";
import { changePasswordDoctorInput } from "../schemas/doctor.schemas";
import AppError from "../utils/appError";
import { verifyJwt } from "../utils/jwt";
import redisClient from "../utils/connectRedis";
import { Doctor } from "../entities/doctor.entity";
import {
  findDoctor,
  findDoctorByEmail,
  findDoctorById,
  updateDoctorPassword,
} from "../services/doctor.service";

export const getMyPatientsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findAllUsers();
    console.log("getMyPatients:\nusers: ", users);
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const changeDoctorPasswordHandler = async (
  req: Request<{}, {}, changePasswordDoctorInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oldPassword, newPassword } = req.body;

    let localDoctor = res.locals.doctor;

    // check old password
    if (!(await Doctor.comparePasswords(oldPassword, localDoctor.password))) {
      return next(new AppError(400, "Wrong password"));
    }

    // change update password:
    updateDoctorPassword(localDoctor.id, newPassword);
    return res.status(200).json({
      status: 200,
      message: "Password updated successfully!",
    });
  } catch (err: any) {
    next(err);
  }
};
