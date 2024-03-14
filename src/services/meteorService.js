const axios = require('axios');
const path = require('path')
const qs = require('qs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function getMeteors(req) {
    const uri = buildMeteorUri();
    const response = await axios.get(uri);
    const meteorsNearby = response.data.near_earth_objects;
    const queryDate = req.query.date ? new Date(req.query.date).toISOString().split('T')[0] : null;
    const isHazardous = req.query.isHazardous === 'true';
    const count = req.query.count ? parseInt(req.query.count) : null;
    return getMeteorsInfo(meteorsNearby, queryDate, isHazardous, count);
}

function getMeteorsInfo(meteorsNearby, queryDate, isHazardous, count){

    let meteors =  Object.values(meteorsNearby).flatMap(date=>
        date.map(m=>({
            id: m.id,
            name: m.name,
            diameterMeters: m.estimated_diameter.meters.estimated_diameter_max,
            isHazardous: m.is_potentially_hazardous_asteroid,
            approachDate: m.close_approach_data[0].close_approach_date,
            velocityKps: m.close_approach_data[0].relative_velocity.kilometers_per_second
        })))

    if (queryDate) {
        result = meteors.filter(meteor =>
            meteor.approachDate.split(' ')[0] === queryDate
        );
    } else {
        result = meteors;
    }

    if (isHazardous){
        result = result.filter(meteor => meteor.isHazardous === true)
    }

    if (count){
        result = result.slice(0, count);
    }

    return result;
}

function buildMeteorUri(){
    const BASE_METEOR_URL = process.env.BASE_METEOR_URL;
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

module.exports = { getMeteors }