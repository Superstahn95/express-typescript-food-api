import express, { Express, Request, Response } from "express";
import colors from "colors";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import api from "./api";
config();

const app: Express = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

//serve static files
app.use("/static", express.static("public"));

app.use("/api/v1", api);

export default app;
