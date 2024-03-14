const Joi = require('joi');

function validateRequest(schema, property) {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
        if (error) {
            const errorMessage = property === 'body' ? 'Request body malformed' : 'Path param contains errors';
            return res.status(400).json({ status: 400, message: errorMessage, error: error.details[0].message });
        }
        next();
    };
}

module.exports = { validateRequest };