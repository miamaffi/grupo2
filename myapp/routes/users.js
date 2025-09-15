var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

// GET /users/login
router.get('/login', userController.login);

// GET /users/register
router.get('/register', userController.register);

// GET /users/me --> para ir al perfil 
router.get('/me', userController.me);

module.exports = router;
