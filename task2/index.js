/**
 * counts asteroids seen in specified period of time
  **/
const { response } = require('express');
const qs = require('qs');
const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/feed';
const START_DATE = '2024-02-26';
const END_DATE = '2024-03-01';
const API_KEY = 'A8qsyVUCdItdYl2csBabMafv8N7MbnFuNaGKgU4b';
const queryParams = {
    START_DATE: START_DATE,
    END_DATE: END_DATE,
    API_KEY: API_KEY
};

const uri = `${BASE_URL}?${qs.stringify(queryParams)}`;

fetch(uri)
.then(response=>response.json())
.then(data => 
    console.log(`Asteroid number from ${START_DATE} to ${END_DATE} is ${data.element_count}`)
)
.catch(error => console.log('Error calling NASA api'))

