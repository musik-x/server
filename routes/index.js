const express = require('express');
const router = express.Router();
const users = require('./users')
const songkick = require('./songkick')
const guardian = require('./guardian')
const genius = require('./genius')

router.use('/users', users)
router.use('/events', songkick)
router.use('/news', guardian)
router.use('/lyrics', genius)


module.exports = router;
