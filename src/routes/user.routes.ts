import express from "express";
import {
  changeUserPasswordHandler,
  getMeHandler,
  loadMessagesHandler,
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
router.get("/loadMessages", loadMessagesHandler)
router.post("/sendDailyReport", sendDailyReportHandler);

export default router;
