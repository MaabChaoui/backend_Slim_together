import { Request, Response, Router } from "express";
import passport from "passport";
import { doctorLoginController } from "../../controllers/login/login.controller";

const router = Router();

router.post(
  "/loginPatient",
  passport.authenticate("local", {
    successRedirect: "/api/successfulLogin",
    failureRedirect: "/api/failedLogin",
  })
);

router.post("/loginDoctor", doctorLoginController);

router.get("/failedLogin", (req: Request, res: Response) => {
  console.log("failedLogin: ", req.body)
  res.json({
    message: "login failed"
  });
});

router.get("/successfulLogin", (req: Request, res: Response) => {
  // @ts-ignore
  console.log("successfulLogin: ", req.session)

  res.json({
    message: "login successful",
  });
});

export { router as LoginRoute };
