import { NextFunction, Request, Response } from "express";
import {
  changePasswordUserInput,
  dailyReportInput,
} from "../schemas/user.schema";
import { User } from "../entities/user.entity";
import AppError from "../utils/appError";
import {
  addSupplements,
  createDailyReport,
  createMeals,
  createSupplementsRecord,
  getSupplements,
  loadUserMessages,
  updateUserPassword,
} from "../services/user.service";
import { IAddSupplements, IMeal } from "../interfaces/requests.interfaces";

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
    breathingSessionDuration,
    nightFasting,
    meals,
    supplements,
  } = req.body;

  try {
    const user = res.locals.user;
    // first we create the DailyReport
    const dr = await createDailyReport(
      {
        wakeUpTime,
        sleepTime,
        screenTime,
        lastScreenTime,
        /* stepCount,
        exerciseDuration,
        exercises, */
        breathingSessionDuration,
        nightFasting,
      },
      user
    );
    console.log("daily report:", dr);

    // Second, we create the meals
    const mealsArray = await createMeals(meals as IMeal[], dr);
    console.log("created meals: ", mealsArray);

    // Third, insert SupplementRecords:
    // should've been called supplementsRecords instead of supplements,
    // TODO: refactor
    //const supplementsRecord = await createSupplementsRecord(supplements, dr);
    //console.log("created supplement records: ", supplementsRecord);

    res.json({
      status: 200,
      message: "successfully add daily report",
      dr: dr,
    });
  } catch (err: any) {
    next(new AppError(err.status, err.message));
  }
};

export const loadUserMessagesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const messages = await loadUserMessages(res.locals.user.id);
  res.status(200).json({
    status: 200,
    data: messages,
  });
};

export const getSupplementsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userSupplements = await getSupplements(res.locals.user);

  res.status(200).json({
    status: 200,
    data: userSupplements,
  });
};

export const addSupplementController = async (
  req: Request<{}, {}, IAddSupplements>,
  res: Response,
  next: NextFunction
) => {
  await addSupplements(req.body.names, res.locals.user);

  res.status(200).json({
    status: 200,
    data: "done",
  });
};
