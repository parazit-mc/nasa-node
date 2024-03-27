import { Request, Response, NextFunction } from 'express';
import errorHandler from '../middlewares/errorHandler';
import { RequestValidationError } from '../validators/validator';
import * as Sentry from '@sentry/node';

jest.mock('@sentry/node');

describe('errorHandler', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock<NextFunction>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should handle RequestValidationError', () => {
    const err = new RequestValidationError('Validation Error', 400);
    errorHandler(err, req as Request, res as Response, next);
    expect(Sentry.captureException).toHaveBeenCalledWith(err);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Validation Error',
      status: 400
    });
  });

  it('should handle other errors', () => {
    const err = new Error('Some error');
    errorHandler(err, req as Request, res as Response, next);
    expect(Sentry.captureException).toHaveBeenCalledWith(err);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Internal Server Error',
      status: 500
    });
  });
});
