import { Schema, model } from "mongoose";
import { ICategory } from "../interfaces";

//a category should be ticked as the default category whenever meals are uploaded without specifying a category
const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    meals: [{ type: Schema.Types.ObjectId, ref: "Meal" }], // Array of meal references
  },
  { timestamps: true }
);

export const Category = model("Category", categorySchema);
