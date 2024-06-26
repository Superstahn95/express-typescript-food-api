import { model, Schema } from "mongoose";
import { IOrder } from "../interfaces";

const orderSchema = new Schema<IOrder>(
  {
    deliveryInfo: {
      deliveryAddress: {
        type: String,
        required: [true, "Delivery address must bbe povi"],
      },
      deliveryAddressNumber: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
    },
    // orderOwner: {
    //   firstName: {
    //     type: String,
    //     required: [true, "Your first name is required"],
    //   },
    //   lastName: {
    //     type: String,
    //     required: [true, "Last name is required"],
    //   },
    //   number: {
    //     type: String,
    //     required: [true, "Phone number is required"],
    //   },
    //   email: {
    //     type: String,
    //     required: [true, "Email is required"],
    //   },
    // },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    //orderedMeals is an array containing a meal which is an objectId and a quantity and
    orderedMeals: [
      {
        meal: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Meal",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: [true, "Order total amount is required"],
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    paymentReference: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
