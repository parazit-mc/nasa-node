const axios = require('axios');
const qs = require('qs');
const Sentry = require("@sentry/node");

async function getImage(req){
    const logged =
        `Authenticating user ${req.body.userId} ${req.body.userName}, api key ${req.body.apiKey}`;
    Sentry.captureMessage(logged);
    console.log(logged);
    const uri = buildImageUri(req.body.apiKey);
    const response = await axios.get(uri);
    return response.data.latest_photos[0].img_src;
}

function buildImageUri(apiKey){
    const BASE_IMAGE_URL = process.env.BASE_IMAGE_URL;
    const queryParams = {
        API_KEY: apiKey
    };

    return `${BASE_IMAGE_URL}?${qs.stringify(queryParams)}`;
}

module.exports = { getImage };