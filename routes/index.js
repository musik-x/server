const express = require('express');
const router = express.Router();
const users = require('./users')
const songkick = require('./songkick')
const guardian = require('./guardian')
const genius = require('./genius')
const spotify = require('./spotify/index')

router.use('/users', users)
router.use('/events', songkick)
router.use('/news', guardian)
router.use('/lyrics', genius)
router.use('/spotify', spotify)


module.exports = router;
