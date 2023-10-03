import { Router } from "express";
import { logoutDoctorController, logoutPatientController } from "../../controllers/logout/logout.controller";

const router = Router()

router.get("/logoutPatient", logoutPatientController)
router.get("/logoutDoctor", logoutDoctorController)

export {router as LogoutRoute}