import * as express from 'express';
import * as Sentry from '@sentry/node';

export function errorHandler(err: Error, req: express.Request, res: express.Response) {
    console.error(err);
    Sentry.captureException(err);
    res.status(500).json({ error: err.message, status: 500 });
}

export default errorHandler;