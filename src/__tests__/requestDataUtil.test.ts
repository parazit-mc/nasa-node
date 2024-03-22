import {
  getMeteorRequestData,
  getImageRequestData
} from '../utils/requestData';
import { Request } from 'express';

describe('getMeteorRequestData', () => {
  it('should extract meteor request data from request', () => {
    const req = {
      query: {
        date: '2024-03-15',
        isHazardous: 'true',
        count: '10'
      }
    } as unknown as Request;

    const result = getMeteorRequestData(req);

    expect(result).toEqual({
      date: '2024-03-15',
      isHazardous: true,
      count: 10
    });
  });

  it('should handle when  count parameter missing', () => {
    const req = {
      query: {
        date: '2024-03-15',
        isHazardous: 'false'
      }
    } as unknown as Request;

    const result = getMeteorRequestData(req);

    expect(result).toEqual({
      date: '2024-03-15',
      isHazardous: false,
      count: null
    });
  });
});

describe('getImageRequestData', () => {
  it('should extract image request data from request body', () => {
    const req = {
      body: {
        userId: '123',
        userName: 'Mr. Unknown',
        apiKey: 'api-key'
      }
    } as unknown as Request;

    const result = getImageRequestData(req);

    expect(result).toEqual({
      userId: '123',
      userName: 'Mr. Unknown',
      apiKey: 'api-key'
    });
  });
});
