import dotenv from "dotenv-safe";
dotenv.config();

export const environmentConfig = {
  MONGO_DB_CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING,
  MONGO_DB_TEST_CONNECTION_STRING: process.env.MONGO_DB_TEST_CONNECTION_STRING,
  PORT: process.env.PORT || 4000,
  ENVIRONMENT: process.env.ENVIRONMENT,
};

export default environmentConfig;
