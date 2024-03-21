import * as Joi from "joi";

export const imageSchema = Joi.object({
    userId: Joi.number().required(),
    userName: Joi.string().required(),
    apiKey: Joi.string().required()
});

export const meteorSchema = Joi.object({
    date: Joi.string().isoDate(),
    isHazardous: Joi.boolean(),
    count: Joi.number().integer().min(1)
});

export default { imageSchema, meteorSchema };