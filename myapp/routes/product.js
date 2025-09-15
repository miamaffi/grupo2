var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

// GET /products/create/new  (form GET)
router.get('/create/new', productController.create);

// GET /products/:id  (detalle estático por ahora)
router.get('/:id', productController.detail);

module.exports = router;
