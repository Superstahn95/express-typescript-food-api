import { Schema, model } from "mongoose";
import { IMeal } from "../interfaces";

const mealSchema = new Schema<IMeal>(
  {
    name: {
      type: String,
      required: [true, "Meal name is required"],
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Meal description is required"],
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "The price is required"],
    },
    mealImage: {
      type: String,
      required: [true, "Image is missing"],
    },
    cloudinary_id: {
      type: String,
      required: true,
    },
    category: {
      //each meal should belong to a category
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
  },
  { timestamps: true }
);

export const Meal = model("Meal", mealSchema);
