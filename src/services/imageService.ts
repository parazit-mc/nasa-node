import axios from 'axios';
import qs from 'qs';
import * as Sentry from '@sentry/node';

export async function getImage(
  userId: string,
  userName: string,
  apiKey: string
): Promise<string[]> {
  const logged = `Authenticating user ${userId} ${userName}, api key ${apiKey}`;
  Sentry.captureMessage(logged);
  console.log(logged);
  const uri = buildImageUri(apiKey);
  const response = await axios.get(uri);
  return response.data.latest_photos[0].img_src;
}

export function buildImageUri(apiKey: string) {
  const BASE_IMAGE_URL = process.env.BASE_IMAGE_URL;
  const queryParams = {
    API_KEY: apiKey
  };
  return `${BASE_IMAGE_URL}?${qs.stringify(queryParams)}`;
}

export default { getImage, buildImageUri };
