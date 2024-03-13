const express = require('express');
const router = express.Router();
const { meteorController } = require('../controllers/meteor');
const { roverImageController } = require('../controllers/image');
const { validateRequest } = require('../validators/validator');
const { roverImageSchema, meteorSchema } = require('../schemas/schema.js');

router.get('/api/v1/meteors', validateRequest(meteorSchema, 'query'), meteorController);

router.post('/api/v1/rover-image', validateRequest(roverImageSchema, 'body'), roverImageController);

module.exports = router;