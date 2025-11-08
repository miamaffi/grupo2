var express = require('express');
var router = express.Router();
// Importamos el controlador de usuarios
const userController = require('../controllers/userController');

// PERFIL DE USUARIO
router.get('/me/id/:id', userController.miPerfil);

// EDITAR PERFIL - mostrar formulario
router.get('/editarPerfil/id/:id', userController.editarPerfil);

// EDITAR PERFIL - procesar formulario
router.post('/editarPerfil/id/:id', userController.updatePerfil)

// DETALLE DE OTRO USUARIO
router.get('/detalleUsuario/id/:id', userController.detalleUsuario);

module.exports = router;

