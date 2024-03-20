import Joi from "joi";

//schema for more features to be added here as application scales
export const mealSchema = {
  createMeal: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    filename: Joi.string()
      .required()
      .label("Invalid request (Please upload Image)"),
  }),
  getMeal: Joi.object({
    mealId: Joi.string().required(),
  }),
};
