import Joi from "joi";

export const categorySchema = {
  createCategory: Joi.object({
    name: Joi.string().required(),
  }),
};
