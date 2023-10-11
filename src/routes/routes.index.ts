import { Request, Response, Router } from "express";
import { authorizePatientController } from "../controllers/authorizePatient.controller";
const router = Router();

// /loginUser and /loginDoctor

router.get("/", (req: Request, res: Response) => {
    res.json({message:"API is working"})
})

router.get("/authorizePatient", authorizePatientController)
export default router