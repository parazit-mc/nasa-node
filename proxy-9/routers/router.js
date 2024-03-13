const express = require('express');
const router = express.Router();
const { meteorController } = require('../controllers/meteor')

router.get('/api/v1/meteors', meteorController);

module.exports = router;