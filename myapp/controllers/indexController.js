// Requerimos nuestro módulo propio (objeto literal) con require()
const data = require('../db/catalogo'); // exporta { usuario, productos }

module.exports = {
  index: (req, res) => {
    const products = data.productos;
    res.render('index', { 
      title: 'Catálogo de Flores', 
      products,
      user: data.usuario
    });
  },

  search: (req, res) => {
    const q = req.query.q; // lo que escribió el usuario en el buscador
    const results = data.productos; // por ahora mostramos todos, no filtramos

    res.render('results', { 
      title: 'Resultados de búsqueda', 
      q, 
      results,
      user: data.usuario
    });
  }
};



