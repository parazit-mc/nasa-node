import * as Sentry from '@sentry/node';
import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export class RequestValidationError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function validateRequest(schema: Schema, property: keyof Request) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      const errorMessage =
        property === 'body'
          ? 'Request body malformed'
          : 'Path param contains errors';
      const validationError = new RequestValidationError(errorMessage, 400);
      Sentry.captureException(validationError);
      throw validationError;
    }
    next();
  };
}

export default { validateRequest };
