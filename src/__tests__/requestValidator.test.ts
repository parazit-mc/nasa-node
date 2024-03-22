import {
  validateRequest,
  RequestValidationError
} from '../validators/validator';
import { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';

describe('validateRequest', () => {
  const mockSchema: Schema = {
    validate: jest
      .fn()
      .mockReturnValue({ error: new Error('Validation error') })
  } as unknown as Schema;
  const mockRequest = {} as Request;
  const mockResponse = {} as Response;
  const mockNext = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw RequestValidationError if body validation failed', () => {
    const mockProperty: keyof Request = 'body';
    expect(() => {
      validateRequest(mockSchema, mockProperty)(
        mockRequest,
        mockResponse,
        mockNext
      );
    }).toThrow(RequestValidationError);

    expect(mockSchema.validate).toHaveBeenCalledWith(mockRequest.body);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should call next middleware if body validation passes', () => {
    const mockProperty: keyof Request = 'body';
    const mockSchema: Schema = {
      validate: jest.fn().mockReturnValue({ error: null })
    } as unknown as Schema;

    validateRequest(mockSchema, mockProperty)(
      mockRequest,
      mockResponse,
      mockNext
    );

    expect(mockSchema.validate).toHaveBeenCalledWith(mockRequest.body);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should throw RequestValidationError if query validation failed', () => {
    const mockProperty: keyof Request = 'query';
    expect(() => {
      validateRequest(mockSchema, mockProperty)(
        mockRequest,
        mockResponse,
        mockNext
      );
    }).toThrow(RequestValidationError);

    expect(mockSchema.validate).toHaveBeenCalledWith(mockRequest.body);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should call next middleware if query validation passes', () => {
    const mockProperty: keyof Request = 'query';
    const mockSchema: Schema = {
      validate: jest.fn().mockReturnValue({ error: null })
    } as unknown as Schema;

    validateRequest(mockSchema, mockProperty)(
      mockRequest,
      mockResponse,
      mockNext
    );

    expect(mockSchema.validate).toHaveBeenCalledWith(mockRequest.body);
    expect(mockNext).toHaveBeenCalled();
  });
});
