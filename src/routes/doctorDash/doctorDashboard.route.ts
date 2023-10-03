import { Request, Response, Router } from "express";
import doctorDashboardController from "../../controllers/doctorDah/doctorDashboard.controller";
import addPatientController from "../../controllers/doctorDah/addPatient.controller";

const router = Router();

router.get("/", doctorDashboardController);

router.post("/addPatient", addPatientController);

export { router as DoctorDashboardRoute };
