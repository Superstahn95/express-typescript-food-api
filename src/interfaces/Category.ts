import { Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  createdAt: string;
  updatedAt: string;
}
