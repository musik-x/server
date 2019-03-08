const express = require('express');
const router = express.Router();
const guardianController = require('../controllers/guardian.js')

//search
router.get('/:keyword', guardianController.search)

module.exports = router