import { Request, Response } from "express";
import { IAddPatient } from "../../interfaces/requests.interfaces";
import { Patient } from "../../entities/Patient.entity";
import { findSourceMap } from "module";

const bcrypt = require("bcrypt");

export default async function addPatientController(
  req: Request,
  res: Response
) {
  const {
    firstName,
    lastName,
    dateOfBirth,
    email,
    password,
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
  } = req.body;
  //}: IAddPatient = req.body;
  console.log("recieved: " + firstName + " " + lastName);
  try {
    const patient: Patient = new Patient();

    patient.email = email;
    const hashedPassword = await bcrypt.hash(password, 10);
    patient.password = hashedPassword;
    //patient.dateOfBirth = dateOfBirth
    patient.firstName = firstName;
    patient.lastName = lastName;
    patient.mobile = mobile ? mobile : null;
    patient.address = address ? address : null;
    patient.gender = gender ? gender : null;
    patient.weight = weight;
    patient.height = height;
    patient.waist = waist;
    patient.hip = hip;
    patient.illnesses = illnesses ? illnesses : null;
    patient.abdominalBloating = abdominalBloating ? abdominalBloating : null;
    patient.sleepProblems = sleepProblems ? sleepProblems : null;
    patient.moreParentIlnesses = moreParentIlnesses ? moreParentIlnesses : null;

    console.log("creating patient " + firstName + " " + lastName);
    await patient.save();

    res.json({
      message: "user added successfully",
      firstName: firstName,
      lastName: lastName,
    });
  } catch (e: any) {
    console.log("error at addPatientController: ", e.message);
    res.status(403).send(e.message);
  }
}
