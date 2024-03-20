import { Schema, model } from "mongoose";
import { ICategory } from "../interfaces";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export const Category = model("Category", categorySchema);
