// Requerimos nuestro módulo propio (objeto literal) con require()
const data = require('../db/catalogo'); // exporta { usuario, productos }
// Exportamos un objeto con métodos (acciones del controlador) para manejar las rutas
module.exports = {
  // Acción que maneja la ruta principal (home) → muestra todos los productos en index.ejs
  index: (req, res) => {
    // Obtenemos los productos del catálogo
    const products = data.productos;
     // Renderizamos la vista 'index' y le pasamos datos: título, productos, usuario y estado de login
    res.render('index', { 
      title: 'Catálogo de Flores', 
      products,
      user: data.usuario,
      logueado: true
    });
  },

  search: (req, res) => {
    const q = req.query.q; // lo que escribió el usuario en el buscador
    const results = data.productos; // por ahora mostramos todos, no filtramos
     // Renderizamos la vista 'results' y le pasamos datos: título, lo buscado, resultados, usuario y estado de login
    res.render('results', { 
      title: 'Resultados de búsqueda', 
      q, 
      results,
      user: data.usuario,
      logueado:true
    });
  }, 
  
};



