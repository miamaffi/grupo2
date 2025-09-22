const data = require('../db/catalogo'); // importo el módulo de datos

module.exports = {
  create: (req, res) => {
    res.render('create', { 
      title: 'Agregar producto',
      user: data.usuario
    });
  },

  detail: (req, res) => {
    // Por ahora mostramos siempre el primer producto
    const product = data.productos[0];

    res.render('detail', { 
      title: product.name, 
      product,
      user: data.usuario,
      logueado: true
    });
  },
  productEdit: (req, res) => {
    const id = parseInt(req.params.id, 10);
    const product = data.productos.find(p => p.id === id) || data.productos[0];
    res.render('productEdit', { title: 'Editar producto', product, user: data.usuario });
  }
};

