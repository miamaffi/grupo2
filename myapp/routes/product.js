// requerimos expres y creamos un router para manejar las rutas
var express = require('express');
var router = express.Router();

//importamos el controlador
const productController = require('../controllers/productController');

// GET /products/create/new  
router.get('/create/new', productController.create);

//POST creacion producto
router.post('/create', productController.store);

// GET editar producto
router.get('/:id/productEdit', productController.productEdit);

//aca faltaria el POST editar producto para actualizar pero no vimos

//detalle producto
router.get('/:id', productController.detail);

// POST Agregar comentario 
router.post('/:id/comment', productController.createComment);

// Exportamos el router para usarlo en app.js
module.exports = router;

