const Sentry = require('@sentry/node');
function errorHandler(err, req, res, next) {
    console.error(err);
    Sentry.captureException(err);
    res.status(500).json({ error: err.message, status: 500 });
}
module.exports = { errorHandler }