import express from "express";
import {
  addSupplementController,
  changeUserPasswordHandler,
  getDailyReportsController,
  getMeHandler,
  getSupplementsController,
  loadUserMessagesHandler,
  sendDailyReportHandler,
} from "../controllers/user.controller";
import { deserializeUser } from "../middleware/deserializeMiddlware";
import { requireUser } from "../middleware/requireMiddlware";
import { validate } from "../middleware/validate";
import { changePasswordUserSchema } from "../schemas/user.schema";

import { Request, Response } from "express";
import { AppDataSource } from "../utils/data-source";
import { DailyReport } from "../entities/PatientProfile/dailyReport.entity";

const router = express.Router();

/* router.get("/delRep", async (req: Request, res: Response) => {
  try {
    const dailyReportRepository = AppDataSource.getRepository(DailyReport);
    await dailyReportRepository
      .createQueryBuilder()
      .delete()
      .from(DailyReport)
      .execute();

    res.status(200).send("All daily reports have been deleted.");
  } catch (error:any) {
    res
      .status(500)
      .send("Error occurred while deleting daily reports: " + error.message);
  }
}); */

router.use(deserializeUser, requireUser);

// Get currently logged in user
router.get("/me", getMeHandler);
router.post(
  "/changePassword",
  validate(changePasswordUserSchema),
  changeUserPasswordHandler
);
router.get("/loadMessages", loadUserMessagesHandler);
//TODO:
router.get("/getDailyReports", getDailyReportsController);
router.post("/sendDailyReport", sendDailyReportHandler);

router.post("/getSupplements", getSupplementsController);
router.post("/addSupplements", addSupplementController);

export default router;
