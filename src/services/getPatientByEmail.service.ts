import { Patient } from "../entities/Patient.entity";

export default async function getPatientByEmail(email: string) {
  const patient = await Patient.findOneBy({ email });

  return { patient };
}
