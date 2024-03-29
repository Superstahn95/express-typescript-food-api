import express, {
  Express,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";
import cookieParser from "cookie-parser";
import colors from "colors";
import { config } from "dotenv";
import morgan from "morgan";
// import cors from "cors";
import helmet from "helmet";
import api from "./api";
import { errorHandlerMiddleware } from "./middlewares/errors";
import { corsMiddleware } from "./middlewares/cors";

config();

const app: Express = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());

//serve static files
app.use("/static", express.static("public"));

app.use("/api/v1", api);

//error handler middleware
app.use(errorHandlerMiddleware);

export default app;
