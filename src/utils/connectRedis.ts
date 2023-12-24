require("dotenv").config();
import "reflect-metadata";
import { createClient } from "redis";
import config from "config";

const redisUrl = `${config.get<string>("redisHost")}:${config.get<number>(
  "redisPort"
)}`;
const redisClient = createClient({
  url: redisUrl,
});

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
