/**
 * create first endpoint and send NASA api response as own server response
 */
const buildMeteorUri = require('../helpers/helpers');

const uri = buildMeteorUri();
const path = require('path');
const express = require('express');
const axios = require('axios');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT;

const app = express();

app.listen(PORT, (error)=>{
    error ? console.log(error) : console.log(`listen to port ${PORT}`);
});

app.get('/api/v1/meteors', async(req,res)=>{
    try{
        const response = await axios.get(uri);

        const result = {
            message: "Meteor count for a given period of time",
            count: response.data.element_count
        }
    
        res.status(200).json(result);
    } catch (error){
        console.error('Error calling NASA api');
        res.status(500).json({error: error.message, status: 500});
    }
});

