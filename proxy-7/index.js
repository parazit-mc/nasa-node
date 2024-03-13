/**
add app logic => filtering fetched data
**/
const buildMeteorUri = require('../helpers/helpers');
const getMeteorsInfo = require('../helpers/utils').default.default;

const uri = buildMeteorUri();
const path = require('path');
const axios = require('axios');
const express = require('express');
const app = express();

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const PORT = process.env.PORT;

app.listen(PORT, (error)=>{
    error ? console.log(error) : console.log(`listen to port ${PORT}`);
});

app.get('/api/v1/meteors', async(req,res)=>{
    try{
        const response = await axios.get(uri);
        const meteorsNearby = response.data.near_earth_objects;

        const meteors = getMeteorsInfo(meteorsNearby);

        const result = {
            count: response.data.element_count,
            meteors: meteors
        }
    
        res.status(200).json(result);
    } catch (error){
        console.error('Error calling NASA api');
        res.status(500).json({error: error.message, status: 500});
    }
});