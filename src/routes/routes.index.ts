import { Request, Response, Router } from "express";
import { UserLoginRoute } from "./login/login.route";
import { DashboardRoute } from "./dashboard/dashboard.route";
const router = Router();

router.use("/", UserLoginRoute)
router.use('/dashboard', DashboardRoute)

router.get("/", (req: Request, res: Response) => {
    res.json({message:"API is working"})
})

export default router