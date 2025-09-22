// requerimos expres y creamos un router para manejar las rutas
var express = require('express');
var router = express.Router();

// Importamos el controlador de usuarios
const userController = require('../controllers/userController');

// GET /users/login
router.get('/login', userController.login);

// GET /users/register
router.get('/register', userController.register);

// GET /users/me --> para ir al perfil 
router.get('/me', userController.me);

// Exportamos el router para usarlo en app.js
module.exports = router;
