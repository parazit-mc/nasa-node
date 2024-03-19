import axios  from 'axios';
import qs  from 'qs';
import * as Sentry from '@sentry/node';
import { Request } from 'express';

export async function getImage(req: Request): Promise<string[]>{
    const logged =
        `Authenticating user ${req.body.userId} ${req.body.userName}, api key ${req.body.apiKey}`;
    Sentry.captureMessage(logged);
    console.log(logged);
    const uri = buildImageUri(req.body.apiKey);
    const response = await axios.get(uri);
    return response.data.latest_photos[0].img_src;
}

function buildImageUri(apiKey: string){
    const BASE_IMAGE_URL = process.env.BASE_IMAGE_URL;
    const queryParams = {
        API_KEY: apiKey
    };
    return `${BASE_IMAGE_URL}?${qs.stringify(queryParams)}`;
}

export default { getImage };