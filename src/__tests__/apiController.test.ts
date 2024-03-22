import { Request, Response, NextFunction } from 'express';
import {
  meteorApiController,
  imageApiController
} from '../controllers/apiController';
import { getMeteorRequestData } from '../utils/requestData';
import { getMeteors } from '../services/meteorService';
import { getImageRequestData } from '../utils/requestData';
import { getImage } from '../services/imageService';

jest.mock('../utils/requestData');
jest.mock('../services/meteorService');
jest.mock('../services/imageService');

describe('meteorApiController', () => {
  const mockRequest = {} as Request;
  const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn()
  } as unknown as Response;
  const mockNext = jest.fn() as NextFunction;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get meteors successful', async () => {
    const mockMeteors = [{ id: 1, name: 'Meteor 1' }];
    (getMeteorRequestData as jest.Mock).mockReturnValue({
      date: '2024-03-21',
      isHazardous: true,
      count: 1
    });
    (getMeteors as jest.Mock).mockResolvedValueOnce(mockMeteors);

    await meteorApiController(mockRequest, mockResponse, mockNext);

    expect(getMeteorRequestData).toHaveBeenCalledWith(mockRequest);
    expect(getMeteors).toHaveBeenCalledWith('2024-03-21', true, 1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ meteors: mockMeteors });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should handle error', async () => {
    const errorMessage = 'Failed to retrieve meteors';
    (getMeteorRequestData as jest.Mock).mockReturnValue({
      date: '2024-03-21',
      isHazardous: true,
      count: 1
    });

    (getMeteors as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await meteorApiController(mockRequest, mockResponse, mockNext);

    expect(getMeteorRequestData).toHaveBeenCalledWith(mockRequest);
    expect(getMeteors).toHaveBeenCalledWith('2024-03-21', true, 1);
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(new Error(errorMessage));
  });
});

describe('imageApiController', () => {
  const mockRequest = {} as Request;
  const mockResponse = {
    status: jest.fn(() => mockResponse),
    send: jest.fn()
  } as unknown as Response;
  const mockNext = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get image', async () => {
    const userId = 'user123';
    const userName = 'JohnDoe';
    const apiKey = 'api-key';
    const imageUrl = 'https://example.com/image.jpg';

    (getImageRequestData as jest.Mock).mockReturnValue({
      userId,
      userName,
      apiKey
    });
    (getImage as jest.Mock).mockResolvedValueOnce(imageUrl);

    await imageApiController(mockRequest, mockResponse, mockNext);

    expect(getImageRequestData).toHaveBeenCalledWith(mockRequest);
    expect(getImage).toHaveBeenCalledWith(userId, userName, apiKey);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith({ result: imageUrl });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should handle error', async () => {
    const userId = 'user123';
    const userName = 'JohnDoe';
    const apiKey = 'api-key';
    const errorMessage = 'Failed to retrieve image';

    (getImageRequestData as jest.Mock).mockReturnValue({
      userId,
      userName,
      apiKey
    });
    (getImage as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await imageApiController(mockRequest, mockResponse, mockNext);

    expect(getImageRequestData).toHaveBeenCalledWith(mockRequest);
    expect(getImage).toHaveBeenCalledWith(userId, userName, apiKey);
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.send).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(new Error(errorMessage));
  });
});
