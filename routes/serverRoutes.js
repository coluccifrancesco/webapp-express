const express = require('express');
const router = express.Router();
const movieController = require('../controller/movieController');

router.get('/', movieController.index);

router.get('/', movieController.show);

module.exports = router;