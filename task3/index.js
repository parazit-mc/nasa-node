/**
 * counts asteroids seen in specified period of time
 * moving envs to a .env file
**/
const path = require('path')
const qs = require('qs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const START_DATE = '2024-02-26';
const END_DATE = '2024-03-01';
const queryParams = {
    START_DATE: START_DATE,
    END_DATE: END_DATE,
    API_KEY: process.env.API_KEY
};

const uri = `${process.env.BASE_URL}?${qs.stringify(queryParams)}`;

fetch(uri)
.then(response=>response.json())
.then(data => 
    console.log(`Asteroid number from ${START_DATE} to ${END_DATE} is ${data.element_count}`)
)
.catch(error => console.log('Error calling NASA api'))

