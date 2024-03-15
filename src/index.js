const Sentry = require("@sentry/node");
const { ProfilingIntegration } = require("@sentry/profiling-node");

Sentry.init({
    dsn: "https://7521b884807badf08e17f15f96f82a57@o4506899478937600.ingest.us.sentry.io/4506899871694848",
    integrations: [
        new ProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
});
const nunjucks = require('nunjucks');

const path = require('path');
const express = require('express');
const app = express();
const router = require('./routers/router')
const { errorHandler } = require('../src/middlewares/errorHandler')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const PORT = process.env.PORT;

nunjucks.configure(path.resolve(__dirname, './views'), {
    autoescape: true,
    express: app
});

app.use(express.json());
app.use(router);
app.use(errorHandler);
app.set('view engine','html');

app.listen(PORT, (error)=>{
    if (error){
        console.log(error);
        Sentry.captureException(error);
    } else {
        console.log(`listen to port ${PORT}`);
    }
});