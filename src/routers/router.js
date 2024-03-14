const express = require('express');
const router = express.Router();
const { meteorController } = require('../controllers/meteorController')
const { roverImageController } = require('../controllers/imageController')

router.get('/api/v1/meteors', meteorController);
router.post('/api/v1/rover-image', roverImageController);

module.exports = router;