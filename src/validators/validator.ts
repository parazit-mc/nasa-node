import * as Sentry from '@sentry/node';
import { Request, Response, NextFunction } from 'express';
import {Schema} from "joi";

class RequestValidationError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = 400;
    }
}

export function validateRequest(schema: Schema, property: keyof Request) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[property]);
        if (error) {
            const errorMessage = property === 'body' ? 'Request body malformed' : 'Path param contains errors';
            const validationError = new RequestValidationError(errorMessage);
            validationError.statusCode = 400;
            validationError.message = error.details[0].message;
            Sentry.captureException(validationError);
            return res.status(400).json({ status: 400, message: errorMessage, error: error.details[0].message });
        }
        next();
    };
}


export default { validateRequest };