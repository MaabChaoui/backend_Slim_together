import { Request, Response } from "express";

export function logoutPatientController(req: Request, res: Response) {
  // @ts-ignore
  if (req.session.doctor) {
    return res.redirect("/logoutDoctor");
  }
  // @ts-ignore

  if (!req.session.patient) {
    res.json({
      message: "no patient logged in.",
    });
  } else {
    req.session.destroy((e: any) => {
      if (e) {
        console.error("Error destroying session:", e);
        res.status(500).json({
          error: {
            message: e.message,
          },
        });
      } else {
        console.log("Patient logged out.");
        res.status(204).json({
          message: "Patient logout successful",
        });
      }
    });
  }
}

export function logoutDoctorController(req: Request, res: Response) {
  // @ts-ignore
  if (!req.session.doctor) {
    res.status(204).json({
      message: "no doctor logged in.",
    });
  } else {
    req.session.destroy((e: any) => {
      if (e) {
        console.error("Error destroying session:", e);
        res.status(500).json({
          error: {
            message: e.message,
          },
        });
      } else {
        console.log("Doctor logged out.");
        res.status(204).json({
          message: "Doctor logout successful",
        });
      }
    });
  }
}
