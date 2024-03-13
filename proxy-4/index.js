/**
 * connect express && start server 
 */
const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT;

app.get('/', (req,res)=> {
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>This is whitelabel page</h1>');
});

const server = http.createServer(app);

server.listen(PORT, (error)=>{
    error ? console.log(error) : console.log(`listen to port ${PORT}`);
})