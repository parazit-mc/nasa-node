const express = require('express');
const router = express.Router();
const { meteorApiController, imageApiController } = require('../controllers/apiController')
const { meteorWebController, imageWebController } = require('../controllers/webController')
const { validateRequest } = require('../validators/validator');
const { imageSchema, meteorSchema } = require('../schemas/schema');

router.get('/meteors', validateRequest(meteorSchema, 'query'), meteorWebController);
router.get('/api/v1/meteors', validateRequest(meteorSchema, 'query'), meteorApiController);

router.post('/api/v1/rover-image', validateRequest(imageSchema, 'body'),  imageApiController);
router.post('/rover-image', validateRequest(imageSchema, 'body'),  imageWebController);

module.exports = router;