const express = require('express');
const router = express.Router();
//controllers
const { getAllDummies } = require('../routeControllers/dummyController');

router.get('/', getAllDummies);

module.exports = router;
