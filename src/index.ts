import mongoose from "mongoose";
import app from "./app";
import { environmentConfig } from "./configs";

const port = process.env.PORT || 4000;
const environment = process.env.NODE_ENVIRONMENT;

export const startServer = async () => {
  const testConnectionString: string | undefined =
    environmentConfig.MONGO_DB_TEST_CONNECTION_STRING;
  const productionConnectionString: string | undefined =
    environmentConfig.MONGO_DB_CONNECTION_STRING;

  //for safety and if environment variables are probably forgotten
  if (!testConnectionString || !productionConnectionString) {
    throw new Error("Add appropriate data connection strings");
  }
  console.log(productionConnectionString);
  try {
    //connect to database
    const conn = await mongoose.connect(
      environment === "development"
        ? testConnectionString
        : productionConnectionString
    );
    console.log(
      `MongoDb connection established to...${conn?.connection?.host}`
    );
    //connect to server
    app.listen(environmentConfig.PORT, () => {
      console.log(
        `Connected to server with port number ${environmentConfig.PORT}`
      );
    });
  } catch (error) {
    console.log("mongodb connection error");
  }
};

// const server = app.listen(port, () => {
//   console.log(`Server runnog on port ${port}`);
// });

startServer();

// export default server;
