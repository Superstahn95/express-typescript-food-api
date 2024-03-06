import dotenv from "dotenv-safe";
dotenv.config();

export const environmentConfig = {
  MONGO_DB_CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING,
  MONGO_DB_TEST_CONNECTION_STRING: process.env.MONGO_DB_TEST_CONNECTION_STRING,
  PORT: process.env.PORT || 4000,
  NODE_ENVIRONMENT: process.env.NODE_ENVIRONMENT,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
};

export default environmentConfig;
