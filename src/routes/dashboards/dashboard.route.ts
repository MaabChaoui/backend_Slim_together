import { Router } from "express";
import dashboardController from "../../controllers/dashboard/dashboardController";

const router = Router();

router.get("/", dashboardController);

export {router as DashboardRoute}