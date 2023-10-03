import { Patient } from "../src/entities/Patient.entity";

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(
  passport: any,
  getPatientByEmail: Function,
  getPatientById: Function
) {
  const authenticatePatient = async (
    email: string,
    password: string,
    done: any
  ) => {
    const patient = await getPatientByEmail(email).then((e:any) => e.patient);
    //const patient = (await Patient.findOneBy({email}))
    console.log(patient.password)
    console.log("patient.password:", patient.password);

    //console.log(patient.id);
    if (patient == null) {
      return done(null, false, { message: "No user with that email" });
    }
    try {
      console.log(" email=", email);
      console.log(" password=", password);
      console.log(" patient.password=", patient.password);
      if (await bcrypt.compare(password, patient.password)) {
        return done(null, patient);
      } else {
        return done(null, false, { message: "Password incorrect" });
      } 
    } catch (e: any) {
      return done(e);
    }
  };

  passport.use(
    new LocalStrategy({ usernameField: "email" }, authenticatePatient)
  );

  passport.serializeUser((patient: Patient, done: Function) =>
    done(null, patient.id)
  );

  passport.deserializeUser((id: number, done: any) =>
    done(null, getPatientById(id))
  );
}

module.exports = initialize;
