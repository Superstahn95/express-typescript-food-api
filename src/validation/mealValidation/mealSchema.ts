import Joi from "joi";

//schema for more features to be added here as application scales
export const mealSchema = {
  createMeal: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    mealImage: Joi.string().required(),
  }),
};
