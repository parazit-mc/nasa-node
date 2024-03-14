const Joi = require('joi');

const imageSchema = Joi.object({
    userId: Joi.number().required(),
    userName: Joi.string().required(),
    apiKey: Joi.string().required()
});

const meteorSchema = Joi.object({
    date: Joi.string().isoDate(),
    isHazardous: Joi.boolean(),
    count: Joi.number().integer().min(1)
});

module.exports = { imageSchema, meteorSchema };