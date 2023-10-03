import { Router } from "express";
import { patientLoginController } from "../../controllers/login/login.controller";
import { doctorLoginController } from "../../controllers/login/login.controller";
const router = Router();

router.post("/loginPatient", patientLoginController);
router.post("/loginDoctor", doctorLoginController)
export { router as LoginRoute };
