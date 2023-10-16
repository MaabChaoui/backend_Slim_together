import config from "config";
import { User } from "../entities/user.entity";
//import { CreateUserInput } from '../schemas/user.schema';
import redisClient from "../utils/connectRedis";
import { AppDataSource } from "../utils/data-source";
import { signJwt } from "../utils/jwt";
import { Doctor } from "../entities/doctor.entity";
import AppError from "../utils/appError";

const doctorRepository = AppDataSource.getRepository(Doctor);

export const findDoctorByEmail = async ({ email }: { email: string }) => {
  return await doctorRepository.findOneBy({ email });
};

export const findDoctorById = async (doctorId: string) => {
  return await doctorRepository.findOneBy({ id: doctorId });
};

export const findDoctor = async (query: Object) => {
  return await doctorRepository.findOneBy(query);
};

// danger zone
export const createDoctor = async (input: any) => {
  console.log("input:\n", input);
  const doctor = AppDataSource.manager.create(Doctor, input);

  console.log(doctor.password);

  return (await AppDataSource.manager.save(doctor)) as Doctor;
};

export const updateDoctorPassword = async (id:string, newPassword: string) => {
  try {
    const doctor = await findDoctorById(id)
    // @ts-ignore
    return await doctorRepository.save(Object.assign(doctor, {password: newPassword}))
  } catch (err: any) {
    return (new AppError(404, "doctor not found"))
  }
}
