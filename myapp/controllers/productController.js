

module.exports = {
  create: (req, res) => res.render('create', { title: 'Agregar producto' }), // 'create'
  detail: (req, res) => {
    const product = { // placeholder estático
      id: 1, name: 'Cámara Vintage', image: '/images/camara.jpg',
      description: 'Cámara analógica de colección.',
      comments: [{ user: 'lola', text: 'La tengo.' }]
    };
    res.render('detail', { title: product.name, product }); // 'detail'
  }
};
