const qs = require('qs');

function buildUri(){
    const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/feed';
    const API_KEY = 'A8qsyVUCdItdYl2csBabMafv8N7MbnFuNaGKgU4b';
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

    const queryParams = {
        START_DATE: mondayDate,
        END_DATE: fridayDate,
        API_KEY: API_KEY
    };
    return `${BASE_URL}?${qs.stringify(queryParams)}`;
}

module.exports = buildUri;