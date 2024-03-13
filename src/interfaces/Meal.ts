import { Document } from "mongoose";

export interface IMeal extends Document {
  name: string;
  price: number;
  description: string;
  mealImage: string;
  cloudinary_id: string;
  createdAt?: string;
  updatedAt?: string;
}
