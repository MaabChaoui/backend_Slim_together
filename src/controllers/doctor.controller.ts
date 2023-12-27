require("dotenv").config();
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
  loadDoctorMessages,
  updateDoctorPassword,
} from "../services/doctor.service";
import config from "config";
import { ILoadMessages } from "../interfaces/requests.interfaces";
import { AppDataSource } from "../utils/data-source";

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

    // update password:
    await updateDoctorPassword(localDoctor.id, newPassword);
    return res.status(200).json({
      status: 200,
      message: "Password updated successfully!",
    });
  } catch (err: any) {
    next(err);
  }
};

export const getDoctorHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = config.get<{
      doctorEmail: string;
    }>("doctorEmail");

    const doctor = await findDoctorByEmail({ email: `${email}` });

    res.status(201).json({
      data: { doctor },
      status: 201,
    });
  } catch (err: any) {
    // ????
    return next(new AppError(400, err.message));
  }
};

export const loadDoctorMessagesHandler = async (
  req: Request<{}, {}, ILoadMessages>,
  res: Response,
  next: NextFunction
) => {
  const messages = await loadDoctorMessages(req.body.roomID);
  console.log("loadDoctorMessagesHandler: ", messages)
  res.status(200).json({
    status: 200,
    data: messages,
  });
  next();
};

export const addDoctorController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    fName,
    lName,
    email,
    phone,
    password,
    gender,
    DateOfBirth,
    bio,
    address,
    city,
    wilaya,
    postcode,
    clinicName,
    clinicAddress,
  } = req.body;

  try {
    const doctorRepository = AppDataSource.getRepository(Doctor);
    const doc = doctorRepository.manager.create(Doctor, {
      fName,
      lName,
      email,
      phone,
      password,
      gender,
      DateOfBirth,
      bio,
      address,
      city,
      wilaya,
      postcode,
      clinicName,
      clinicAddress,
    });
    await doctorRepository.save(doc);

    res.status(200).json({
      status: 200,
      data: "way doctor added! ",
      doctor: doc,
    });
  } catch (error: any) {
    res.status(500).json({ error: error });
  }
};

