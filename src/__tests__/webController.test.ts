import { Request, Response, NextFunction } from 'express';
import { getMeteors } from '../services/meteorService';
import { getImage } from '../services/imageService';
import {
  getMeteorRequestData,
  getImageRequestData
} from '../utils/requestData';
import {
  meteorWebController,
  imageWebController
} from '../controllers/webController';

jest.mock('../services/meteorService');
jest.mock('../services/imageService');
jest.mock('../utils/requestData');

describe('meteorWebController', () => {
  const mockRequest = {} as Request;
  const mockResponse = {
    render: jest.fn()
  } as unknown as Response;
  const mockNext = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render meteor.html with data retrieved', async () => {
    const date = '2024-03-21';
    const isHazardous = true;
    const count = 10;
    const mockMeteors = [{ id: 1, name: 'Meteor 1' }];

    (getMeteorRequestData as jest.Mock).mockReturnValue({
      date,
      isHazardous,
      count
    });
    (getMeteors as jest.Mock).mockResolvedValueOnce(mockMeteors);

    await meteorWebController(mockRequest, mockResponse, mockNext);

    expect(getMeteorRequestData).toHaveBeenCalledWith(mockRequest);
    expect(getMeteors).toHaveBeenCalledWith(date, isHazardous, count);
    expect(mockResponse.render).toHaveBeenCalledWith('meteor.html', {
      meteors: mockMeteors
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should call next with error when error happened', async () => {
    const errorMessage = 'Failed to retrieve meteor data';
    (getMeteorRequestData as jest.Mock).mockReturnValue({});
    (getMeteors as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await meteorWebController(mockRequest, mockResponse, mockNext);

    expect(getMeteorRequestData).toHaveBeenCalledWith(mockRequest);
    expect(getMeteors).toHaveBeenCalledWith(undefined, undefined, undefined);
    expect(mockResponse.render).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(new Error(errorMessage));
  });
});

describe('imageWebController', () => {
  const mockRequest = {} as Request;
  const mockResponse = {
    render: jest.fn()
  } as unknown as Response;
  const mockNext = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render roverImage.html with URL', async () => {
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

    await imageWebController(mockRequest, mockResponse, mockNext);

    expect(getImageRequestData).toHaveBeenCalledWith(mockRequest);
    expect(getImage).toHaveBeenCalledWith(userId, userName, apiKey);
    expect(mockResponse.render).toHaveBeenCalledWith('roverImage.html', {
      imageUrl
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should call next with error when error happened', async () => {
    const errorMessage = 'Failed to retrieve image';
    (getImageRequestData as jest.Mock).mockReturnValue({});
    (getImage as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await imageWebController(mockRequest, mockResponse, mockNext);

    expect(getImageRequestData).toHaveBeenCalledWith(mockRequest);
    expect(getImage).toHaveBeenCalledWith(undefined, undefined, undefined);
    expect(mockResponse.render).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(new Error(errorMessage));
  });
});
