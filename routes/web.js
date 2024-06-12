const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/HomeController');
const AuthController = require('../app/controllers/AuthController');

router.get('/', HomeController.homePage);
router.post('/authentication', AuthController.authenticateUser);
router.post('/create-user', AuthController.createUser); // Add new route

module.exports = router;
