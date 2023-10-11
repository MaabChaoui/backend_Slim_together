import { Request, Response } from "express";

export function authorizePatientController(req: Request, res: Response) {
  console.log("authorizing patient");
  console.log("pls work: ",req.sessionID)
  // @ts-ignore
  if (!req.session.patient) {
    console.log("not allowed");

    res.status(403).send();
  } else {
    console.log("allowed");
    res.status(200).send("ok");
  }
}