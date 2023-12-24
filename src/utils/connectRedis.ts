require("dotenv").config();
import "reflect-metadata";
import { createClient } from "redis";
import config from "config";

const redisClient = createClient(
  config.get<{
    url: string;
    password: string;
    username: string;
  }>("redisConfig")
);

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis client connected successfully");
    redisClient.set("try", "Hello Welcome to Express with TypeORM");
  } catch (error) {
    console.log(error);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

export default redisClient;
