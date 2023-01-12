// Contoh Routing
const express = require('express');
const router = express.Router();
const HomeController = require('../controller/home.controller')

// Home
router.get('/', HomeController.index);

module.exports = router;