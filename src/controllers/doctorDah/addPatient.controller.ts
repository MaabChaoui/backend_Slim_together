import { Request, Response } from "express";
import { IAddPatient } from "../../interfaces/requests.interfaces";

export default async function addPatientController(
  req: Request,
  res: Response
) {
  const {
    firstName,
    lastName,
    dateOfBirth,
    email,
    mobile,
    address,
    gender,
    weight,
    height,
    waist,
    hip,
    illnesses,
    abdominalBloating,
    sleepProblems,
    moreParentIlnesses,
  }: IAddPatient = req.body;

  
}
