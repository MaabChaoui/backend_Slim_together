export default {
  port: "PORT",
  postgresConfig: {
    host: "POSTGRES_HOST",
    port: "POSTGRES_PORT",
    username: "POSTGRES_USER",
    password: "POSTGRES_PASSWORD",
    database: "POSTGRES_DB",
  },
  redisConfig: {
    url: "REDIS_URL",
    password: "REDIS_PASSWORD",
    username: "REDIS_USER"
  },
  nextPublicURL: "NEXT_PUBLIC_URL",
  accessTokenPrivateKey: "JWT_ACCESS_TOKEN_PRIVATE_KEY",
  accessTokenPublicKey: "JWT_ACCESS_TOKEN_PUBLIC_KEY",
  refreshTokenPrivateKey: "JWT_REFRESH_TOKEN_PRIVATE_KEY",
  refreshTokenPublicKey: "JWT_REFRESH_TOKEN_PUBLIC_KEY",
  doctorEmail: "DOCTOR_EMAIL",
  redisHost: "REDIS_HOST",
  redisPort: "REDIS_PORT",
};
