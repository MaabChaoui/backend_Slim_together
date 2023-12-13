import express from "express";
import {
  addSupplementController,
  changeUserPasswordHandler,
  getMeHandler,
  getSupplementsController,
  loadUserMessagesHandler,
  sendDailyReportHandler,
} from "../controllers/user.controller";
import { deserializeUser } from "../middleware/deserializeMiddlware";
import { requireUser } from "../middleware/requireMiddlware";
import { validate } from "../middleware/validate";
import { changePasswordUserSchema } from "../schemas/user.schema";

const router = express.Router();

router.use(deserializeUser, requireUser);

// Get currently logged in user
router.get("/me", getMeHandler);
router.post(
  "/changePassword",
  validate(changePasswordUserSchema),
  changeUserPasswordHandler
);
router.get("/loadMessages", loadUserMessagesHandler);
router.post("/sendDailyReport", sendDailyReportHandler);

router.post("/getSupplements", getSupplementsController);
router.post("/addSupplements", addSupplementController);

export default router;
