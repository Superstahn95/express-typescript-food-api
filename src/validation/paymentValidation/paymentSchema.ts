import Joi from "joi";

export const paymentSchema = {
  verifyPayment: Joi.object({
    reference: Joi.string().required(),
    amount: Joi.number().required(),
  }),
};
