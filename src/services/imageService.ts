import axios from 'axios';
import qs from 'qs';
import * as Sentry from '@sentry/node';
import NodeCache from 'node-cache';

const cache = new NodeCache({stdTTL: 3600});

export async function getImage(
  userId: string,
  userName: string,
  apiKey: string
): Promise<string[]> {
  const uri = buildImageUri(apiKey);

  const cacheKey = uri;
  const cachedResult = cache.get(cacheKey) as string[] | undefined;

  if (cachedResult){
    console.log('cached result found for ', cacheKey);
    return cachedResult;
  }

  const logged = `Authenticating user ${userId} ${userName}, api key ${apiKey}`;
  Sentry.captureMessage(logged);
  console.log(logged);

  const response = await axios.get(uri);
  const result = response.data.latest_photos[0].img_src;

  cache.set(cacheKey, result);
  console.log('result cached for ', cacheKey);
  return result;
}

export function buildImageUri(apiKey: string) {
  const BASE_IMAGE_URL = process.env.BASE_IMAGE_URL;
  const queryParams = {
    API_KEY: apiKey
  };
  return `${BASE_IMAGE_URL}?${qs.stringify(queryParams)}`;
}

export default { getImage};
