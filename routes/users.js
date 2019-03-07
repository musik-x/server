const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.js')
const authentication = require('../middlewares/authentication')

router.post('/login', userController.login)

module.exports = router;
