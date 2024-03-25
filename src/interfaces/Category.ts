import mongoose, { Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  createdAt: string;
  updatedAt: string;
  isDefault: boolean;
  //each category should have an array of meals
  meals: mongoose.Types.ObjectId[];
}

// the default property is for meals created without sppecifying a category.
//this meals will automatically belong to that category
