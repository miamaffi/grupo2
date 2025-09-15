module.exports = {
    index: (req, res) => {
      // Por ahora, sin módulo de datos: lista vacía
      const products = [];
      res.render('index', { title: 'Catálogo', products }); // 👈 PASAR products
    },
    search: (req, res) => {
      const q = (req.query.q || '').trim();
      res.render('search/results', { title: 'Resultados', q, results: [] });
    }
  };
  