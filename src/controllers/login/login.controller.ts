import { Request, Response } from "express";
import { ILoginRequest } from "../../interfaces/requests.interfaces";
import { ILoginResponse } from "../../interfaces/responses.interfaces";
import { IResponseError } from "../../interfaces/responses.errors";
import getPatientByEmail from "../../services/getPatientByEmail.service";
import { stringify } from "querystring";

export async function patientLoginController(req: Request, res: Response) {
  let resp: ILoginResponse;

  const { email, password }: ILoginRequest = req.body;
  const bcrypt = require("bcrypt");
  //login logic
  if (email && password) {
    console.log(" before: patientLoginController: ", req.session);
    try {
      //check if email is registered
      const patient = (await getPatientByEmail(email)).patient;
      if (patient == null) {
        res.status(404).json({
          error: {
            message: "No user with this email",
          },
        });
      } else {
        // check if password is correct
        if (await bcrypt.compare(password, patient.password)) {
          // register session variables
          // @ts-ignore
          req.session.patient = patient;
          res.status(200).send();
        } else {
          res.json({
            error: {
              message: "wrong password",
            },
          });
        }
      }
    } catch (e: any) {
      console.log("error at patientLoginController: ", e.message);
      res.json({
        error: {
          message: e.message,
        },
      });
    }
  } else {
    res.json({
      error: {
        message: "password or email missing",
      },
    });
  }
  console.log(" after: patientLoginController: ", req.session);
}

export async function doctorLoginController(req: Request, res: Response) {
  const { email, password }: ILoginRequest = req.body;
  res.json(null);
}
