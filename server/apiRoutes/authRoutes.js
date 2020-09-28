const express = require('express');
const router = express.Router();
//controllers
const authController = require('../routeControllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
