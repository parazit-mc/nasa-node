import axios from 'axios';
import { getImage, buildImageUri } from '../services/imageService';

jest.mock('axios');

beforeAll(() => {
  process.env.BASE_IMAGE_URL = 'https://example.com';
});

describe('getImage function', () => {
  const userId = 'user123';
  const userName = 'JohnDoe';
  const apiKey = 'api-key';

  it('should get image URL', async () => {
    const mockResponse = {
      data: {
        latest_photos: [{ img_src: 'https://example.com/image.jpg' }]
      }
    };

    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const image = await getImage(userId, userName, apiKey);

    expect(image).toBe('https://example.com/image.jpg');
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.BASE_IMAGE_URL}?API_KEY=api-key`
    );
  });
});

describe('buildImageUri function', () => {
  const apiKey = 'api-key';

  it('should build URI with provided API key', () => {
    const expectedUri = 'https://example.com?API_KEY=api-key';

    const uri = buildImageUri(apiKey);

    expect(uri).toBe(expectedUri);
  });
});
