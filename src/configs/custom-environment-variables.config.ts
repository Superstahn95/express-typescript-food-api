import dotenv from "dotenv-safe";
dotenv.config();

export const environmentConfig = {
  MONGO_DB_CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING,
  MONGO_DB_TEST_CONNECTION_STRING: process.env.MONGO_DB_TEST_CONNECTION_STRING,
  PORT: process.env.PORT || 4000,
  NODE_ENVIRONMENT: process.env.NODE_ENVIRONMENT,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

export default environmentConfig;
