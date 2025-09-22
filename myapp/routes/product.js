// requerimos expres y creamos un router para manejar las rutas
var express = require('express');
var router = express.Router();

//importamos el controlador
const productController = require('../controllers/productController');

// GET /products/create/new  (form GET)
router.get('/create/new', productController.create);

// /products/:id/product-edit
router.get('/:id/productEdit', productController.productEdit);

// GET /products/:id  (detalle estático por ahora)
router.get('/:id', productController.detail);

// Exportamos el router para usarlo en app.js
module.exports = router;

