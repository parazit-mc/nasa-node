/**
add app logic => add query parameters
**/

const path = require('path');
const express = require('express');
const app = express();
const router = require('./routers/router')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const PORT = process.env.PORT;

app.listen(PORT, (error)=>{
    error ? console.log(error) : console.log(`listen to port ${PORT}`);
});

app.use(router);