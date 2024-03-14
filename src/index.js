const path = require('path');
const express = require('express');
const app = express();
const router = require('./routers/router')
const { errorHandler } = require('../src/middlewares/errorHandler')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const PORT = process.env.PORT;

app.use(express.json());
app.use(router);
app.use(errorHandler);
app.listen(PORT, (error)=>{
    error ? console.log(error) : console.log(`listen to port ${PORT}`);
});