const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication')
const songkickController = require('../controllers/songkick')

router.get('/look-for-events/:artist', authentication, songkickController.findEvents)
router.get('/details/:id', authentication, songkickController.eventDetails)
router.get('/upcoming-events/:artist', authentication, songkickController.upcomingEvents)

module.exports = router