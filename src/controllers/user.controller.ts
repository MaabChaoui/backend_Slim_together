import { NextFunction, Request, Response } from "express";
import {
  changePasswordUserInput,
  dailyReportInput,
} from "../schemas/user.schema";
import { User } from "../entities/user.entity";
import AppError from "../utils/appError";
import { createDailyReport, updateUserPassword } from "../services/user.service";

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    res.status(200).status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(new AppError(400, err.message));
  }
};

export const changeUserPasswordHandler = async (
  req: Request<{}, {}, changePasswordUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oldPassword, newPassword } = req.body;

    let localUser = res.locals.user;

    // check old password
    if (!(await User.comparePasswords(oldPassword, localUser.password))) {
      return next(new AppError(400, "Wrong password"));
    }
    await updateUserPassword(localUser.id, newPassword);
    return res.status(200).json({
      status: 200,
      message: "Password updated successfully!",
    });
    /* // update password:
    const result = await updateUserPassword(localUser.id, newPassword);

    console.log("result:",result)

    if (result !instanceof AppError){
    return res.status(200).json({
      status: 200,
      message: "Password updated successfully!",
    });
  } else {
    return next(result)
  } */
  } catch (err: any) {
    return new AppError(404, err.message);
  }
};

export const sendDailyReportHandler = async (
  req: Request<{}, {}, dailyReportInput>,
  res: Response,
  next: NextFunction
) => {
  const {
    wakeUpTime,
    sleepTime,
    screenTime,
    lastScreenTime,
    stepCount,
    exerciseDuration,
    exercises,
    breathingSessionDuration,
    nightFasting,
  } = req.body;

  try {
    const user = res.locals.user;
    const dr = await createDailyReport({
      wakeUpTime,
      sleepTime,
      screenTime,
      lastScreenTime,
      stepCount,
      exerciseDuration,
      exercises,
      breathingSessionDuration,
      nightFasting,
    }, user)
    console.log("daily report:",dr)
    res.json({
      status: 200,
      message: "successfully add daily report"
    })
  } catch (err: any) {
    next(new AppError(err.status, err.message));
  }
  
};
