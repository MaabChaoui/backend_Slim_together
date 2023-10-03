import { Request, Response, Router } from "express";
import { LoginRoute } from "./login/login.route";
import { DoctorDashboardRoute } from "./doctorDash/doctorDashboard.route";
const router = Router();

// /loginUser and /loginDoctor
router.use("/", LoginRoute) 
router.use('/doctorDash', DoctorDashboardRoute)

router.get("/", (req: Request, res: Response) => {
    res.json({message:"API is working"})
})

export default router