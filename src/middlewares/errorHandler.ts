import {NextFunction, Request, Response} from 'express';
import * as Sentry from '@sentry/node';
import {RequestValidationError} from "../validators/validator";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err);

    if (err instanceof RequestValidationError) {
        Sentry.captureException(err);
        res.status(err.statusCode).json({error: err.message, status: err.statusCode});
    } else {
        Sentry.captureException(err);
        res.status(500).json({ error: 'Internal Server Error', status: 500 });
    }
}

export default errorHandler;