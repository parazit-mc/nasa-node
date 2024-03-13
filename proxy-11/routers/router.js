const express = require('express');
const router = express.Router();
const qs = require('qs');
const axios = require('axios');
const { meteorController } = require('../controllers/meteor')
const { roverImageController } = require('../controllers/image')

router.get('/api/v1/meteors', meteorController);

router.post('/api/v1/rover-image', roverImageController);

module.exports = router;