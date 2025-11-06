///myapp/routes/index.js
var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController");

// Home (catálogo)
router.get('/', indexController.index);

// Mostrar formulario de registro
router.get('/users/register', indexController.registro);

// Login
router.get('/users/login', indexController.login);       // muestra el formulario
router.post('/users/login', indexController.loginPost);  // procesa el login

// Logout
router.get('/users/logout', indexController.logout);     

// Procesar datos del formulario de registro
router.post('/user/register', indexController.store);

// busqueda 
router.get('/search', indexController.busqueda);

module.exports = router;