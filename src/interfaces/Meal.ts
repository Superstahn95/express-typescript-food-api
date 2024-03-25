import mongoose, { Document } from "mongoose";

export interface IMeal extends Document {
  name: string;
  price: number;
  description: string;
  mealImage: string;
  category: mongoose.Types.ObjectId | null;
  cloudinary_id: string;
  createdAt?: string;
  updatedAt?: string;
}
