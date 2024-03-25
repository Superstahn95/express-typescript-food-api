import Joi from "joi";

export const categorySchema = {
  createCategory: Joi.object({
    name: Joi.string().required(),
    isDefault: Joi.boolean().required(),
  }),
  deleteCategory: Joi.object({
    categoryId: Joi.string().required(),
  }),
};
