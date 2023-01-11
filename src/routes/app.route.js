// Contoh Routing
const express = require('express');
const router = express.Router();
const AppController = require('../controller/app.controller')

// Shorten
router.post('/shorten', AppController.shorten);

// Redirect
router.get('/:code', AppController.redirect);

module.exports = router;