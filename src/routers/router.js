const express = require('express');
const router = express.Router();
const { meteorController } = require('../controllers/meteorController')
const { imageController } = require('../controllers/imageController')
const { validateRequest } = require('../validators/validator');
const { imageSchema, meteorSchema } = require('../schemas/schema');

router.get('/api/v1/meteors', validateRequest(meteorSchema, 'query'), meteorController);
router.post('/api/v1/rover-image', validateRequest(imageSchema, 'body'),  imageController);

module.exports = router;