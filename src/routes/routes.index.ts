import { Request, Response, Router } from "express";

const router = Router();

// /loginUser and /loginDoctor

router.get("/", (req: Request, res: Response) => {
    res.json({message:"API is working"})
})

export default router