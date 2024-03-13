const Joi = require('joi');
const Sentry = require('@sentry/node');

function validateRequest(schema, property) {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
        if (error) {
            const errorMessage = property === 'body' ? 'Request body malformed' : 'Path param contains errors';
            const validationError = new Error(errorMessage);
            validationError.statusCode = 400;
            validationError.details = error.details[0].message;
            Sentry.captureException(validationError);
            return res.status(400).json({ status: 400, message: errorMessage, error: error.details[0].message });
        }
        next();
    };
}

module.exports = { validateRequest };