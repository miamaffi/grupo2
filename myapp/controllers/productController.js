const data = require('../db/catalogo'); // importo el módulo de datos

module.exports = {
  // Renderiza el formulario para crear un nuevo producto
  create: (req, res) => {
    // Renderizamos la vista 'create' con el título y el usuario logueado
    res.render('create', { 
      title: 'Agregar producto',
      user: data.usuario
    });
  },
 // muestra el detalle de un producto
  detail: (req, res) => {
    // Por ahora mostramos siempre el primer producto del array
    const product = data.productos[0];
    // Renderizamos la vista 'detail' pasándole datos del producto y usuario
    res.render('detail', { 
      title: product.name, 
      product,
      user: data.usuario,
      logueado: true
    });
  },

// para editar un producto (siempre el primero)
productEdit: (req, res) => {
  // Tomamos siempre el primer producto del array
  const product = data.productos[0];

  // Mostramos la vista 'productEdit' con ese producto
  res.render('productEdit', { 
    title: 'Editar producto', 
    product, 
    user: data.usuario 
  });
}
};

