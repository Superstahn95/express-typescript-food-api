import Joi from "joi";

const orderedMealSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
  meal: Joi.string().required(),
});

export const orderSchema = {
  placeOrder: Joi.object({
    deliveryInfo: Joi.object()
      .keys({
        deliveryAddress: Joi.string().required,
        phoneNumber: Joi.string().required(),
        deliveryAddressNumber: Joi.string().required(),
      })
      .required(),
    orderedMeals: Joi.array().items(orderedMealSchema),
    totalAmount: Joi.number().required(),
    paymentReference: Joi.string()
      .required()
      .message("You need to make a payment first"),
  }),
};
