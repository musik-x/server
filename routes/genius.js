const express = require('express');
const router = express.Router();
const lyricsController = require('../controllers/genius')

router.get('/search/:query', lyricsController.search)

module.exports = router