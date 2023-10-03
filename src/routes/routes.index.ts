import { Request, Response, Router } from "express";
import { LoginRoute } from "./login/login.route";
import { DoctorDashboardRoute } from "./doctorDash/doctorDashboard.route";
import { LogoutRoute } from "./logout/lougout.route";
const router = Router();

// /loginUser and /loginDoctor
router.use("/", LoginRoute) 
router.use("/", LogoutRoute)

router.use('/doctorDash', DoctorDashboardRoute)
router.get("/", (req: Request, res: Response) => {
    res.json({message:"API is working"})
})

export default router