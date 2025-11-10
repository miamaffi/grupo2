var express = require('express');
var router = express.Router();
// Importamos el controlador de usuarios
const userController = require('../controllers/userController');

// PERFIL DE USUARIO
router.get('/me/id/:id', userController.miPerfil);

// EDITAR PERFIL - mostrar formulario
router.get('/editarPerfil/id/:id', userController.editarPerfil);
//aca faltaria el post de editar perfil para hacer update pero no lo vimos entonces el formulario no envia nada

// DETALLE DE OTRO USUARIO
router.get('/detalleUsuario/id/:id', userController.detalleUsuario);

module.exports = router;

