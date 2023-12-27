import express, { Request, Response, NextFunction } from "express";
import { deserializeDoctor } from "../middleware/deserializeMiddlware";
import { requireDoctor } from "../middleware/requireMiddlware";
import {
  addDoctorController,
  changeDoctorPasswordHandler,
  getDoctorHandler,
  getMyPatientsHandler,
  loadDoctorMessagesHandler,
} from "../controllers/doctor.controller";
import { validate } from "../middleware/validate";
import { changePasswordDoctorSchema } from "../schemas/doctor.schemas";
import { AppDataSource } from "../utils/data-source";
import { Doctor } from "../entities/doctor.entity";

const router = express.Router();

// FORBIDDEN route to create doctor
// router.post("addDoctor", addDoctorController);

router.get("/", getDoctorHandler);

// middlware
router.use(deserializeDoctor, requireDoctor);

router.get("/myPatients", getMyPatientsHandler);
router.post(
  "/changePassword",
  validate(changePasswordDoctorSchema),
  changeDoctorPasswordHandler
);
router.post("/loadMessages", loadDoctorMessagesHandler);

export default router;
