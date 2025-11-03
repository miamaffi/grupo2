// requerimos expres y creamos un router para manejar las rutas
const express = require('express');
const router = express.Router();

// Importamos el controlador
const indexController = require('../controllers/indexController');

// definimos rutas
router.get('/', indexController.index); // Ruta principal, muestra el catálogo
//router.get('/search', indexController.search); // Ruta busqueda, muestra lo buscado

module.exports = router;
