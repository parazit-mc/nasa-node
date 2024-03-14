const axios = require('axios');
const qs = require('qs');

async function getImage(req){
    console.log("Authenticating user " + req.body.userId + " " + req.body.userName + ", api key " + req.body.apiKey);
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