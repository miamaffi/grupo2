var express = require('express');
var router = express.Router();
// Importamos el controlador de usuarios
const userController = require('../controllers/userController');

// PERFIL DE USUARIO
router.get('/me/id/:id', userController.miPerfil);

//ESTO ESTA MAL
// EDITAR PERFIL - mostrar formulario
router.get('/me/id/:id', userController.editarPerfil);

// EDITAR PERFIL - procesar formulario
router.post('/me/id/:id', userController.updatePerfil);

// DETALLE DE OTRO USUARIO
router.get('/me/id/:id', userController.detalleUsuario);

module.exports = router;

