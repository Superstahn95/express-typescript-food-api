import mongoose, { Document } from "mongoose";

export interface OrderUserDetails {
  firstName: string;
  lastName: string;
  number: string;
  email: string;
}

export interface IDeliveryInfo {
  deliveryAddress: string;
  phoneNumber: string;
  deliveryAddressNumber: string;
}

//pending more additions as development goes on
export interface IOrder extends Document {
  orderedMeals: { quantity: number; meal: mongoose.Schema.Types.ObjectId }[];
  deliveryInfo: IDeliveryInfo;
  // orderOwner: OrderUserDetails;
  userId: mongoose.Schema.Types.ObjectId;
  totalAmount: number;
  paymentReference: string;
  isDelivered: boolean;
}
