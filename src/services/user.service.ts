import config from "config";
import { User } from "../entities/user.entity";
//import { CreateUserInput } from '../schemas/user.schema';
import redisClient from "../utils/connectRedis";
import { AppDataSource } from "../utils/data-source";
import { signJwt } from "../utils/jwt";
import { Doctor } from "../entities/doctor.entity";
import AppError from "../utils/appError";
import { DailyReport } from "../entities/PatientProfile/dailyReport.entity";
import { dailyReportInput } from "../schemas/user.schema";

const userRepository = AppDataSource.getRepository(User);
const dailyReportRepository = AppDataSource.getRepository(DailyReport);

export const createUser = async (input: any) => {
  console.log("create user input::\n", input);
  const user = AppDataSource.manager.create(User, input);

  return (await AppDataSource.manager.save(user)) as User;
};

export const findUserByEmail = async ({ email }: { email: string }) => {
  return await userRepository.findOneBy({ email });
};

export const findUserById = async (userId: string) => {
  return await userRepository.findOneBy({ id: userId });
};

export const findUser = async (query: Object) => {
  return await userRepository.findOneBy(query);
};

export const findAllUsers = async () => {
  return await userRepository.find();
};

// ? Sign access and Refresh Tokens
// scary times
export const signTokens = async (user: User | Doctor) => {
  // 1. Create Session
  redisClient.set(user.id, JSON.stringify(user), {
    EX: config.get<number>("redisCacheExpiresIn") * 60,
  });

  // 2. Create Access and Refresh tokens
  const access_token = signJwt({ sub: user.id }, "accessTokenPrivateKey", {
    expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
  });

  const refresh_token = signJwt({ sub: user.id }, "refreshTokenPrivateKey", {
    expiresIn: `${config.get<number>("refreshTokenExpiresIn")}m`,
  });

  return { access_token, refresh_token };
};

export const updateUserPassword = async (id: string, newPassword: string) => {
  try {
    const user = await findUserById(id);
    return await userRepository.save(
      // @ts-ignore
      Object.assign(user, { password: newPassword })
    );
  } catch (err: any) {
    return new AppError(404, err.message);
  }
};

export const createDailyReport = async (input: any, user: User) => {
  const dailyReport = dailyReportRepository.manager.create(DailyReport, {
    ...input,
    user: user,
  });
  return await dailyReportRepository.manager.save(dailyReport);
};
