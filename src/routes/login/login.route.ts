import { Router } from "express";
import { userLoginController } from "../../controllers/login/login.controller";
import { doctorLoginController } from "../../controllers/login/login.controller";
const router = Router();

router.post("/loginUser", userLoginController);
router.post("/loginDoctor", doctorLoginController)
export { router as LoginRoute };
