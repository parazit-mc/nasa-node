import * as Sentry from '@sentry/node';
import  { ProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
    dsn: 'https://7521b884807badf08e17f15f96f82a57@o4506899478937600.ingest.us.sentry.io/4506899871694848',
    integrations: [
        new ProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
});
import nunjucks  from 'nunjucks';
import dotenv from 'dotenv';
import * as path  from 'path';
import express from 'express';
const app = express();
import  router from './routers/router';
import errorHandler  from './middlewares/errorHandler';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const PORT = process.env.PORT;

nunjucks.configure(path.resolve(__dirname, './views'), {
    autoescape: true,
    express: app
});

app.use(express.json());
app.use(router);
app.use(errorHandler);
app.set('view engine','html');

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.on('error', (error: Error) => {
    console.error('Server startup error:', error);
    Sentry.captureException(error);
});

process.on('SIGTERM', () => {
    console.log('Received SIGTERM signal. Closing server gracefully...');

    server.close(() => {
        console.log('Server closed gracefully.');
        process.exit(0);
    });
});