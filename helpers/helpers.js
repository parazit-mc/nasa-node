const qs = require('qs');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

function buildMeteorUri(){
    const BASE_METEOR_URL = 'https://api.nasa.gov/neo/rest/v1/feed';
    const formatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const today = new Date();
    const currentDay = today.getDay();

    let monday, friday;

    if (currentDay === 0 || currentDay === 6){
        monday = new Date(today);
        monday.setDate(today.getDate() - (currentDay - 1));
        friday = new Date(today);
        friday.setDate(today.getDate() + (5 - currentDay));
    } else {
        monday = new Date(today);
        monday.setDate(today.getDate() - (currentDay + 6)); 
        friday = new Date(today);
        friday.setDate(today.getDate() - (currentDay + 2));
    }
    const mondayDate = monday.toLocaleDateString('en-US', formatOptions);
    const fridayDate = friday.toLocaleDateString('en-US', formatOptions);
    console.log('Start date is ' + mondayDate);
    console.log('End date is ' + fridayDate);
    
    const queryParams = {
        START_DATE: mondayDate,
        END_DATE: fridayDate,
        API_KEY: process.env.API_KEY
    };
    return `${BASE_METEOR_URL}?${qs.stringify(queryParams)}`;
}

function buildImageUri(apiKey){
    const BASE_IMAGE_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos'
    const queryParams = {
        API_KEY: apiKey
    };

    return `${BASE_IMAGE_URL}?${qs.stringify(queryParams)}`;
}

module.exports = {buildImageUri, 
                buildMeteorUri} ;