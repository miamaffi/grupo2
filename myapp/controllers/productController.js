// /controllers/productController.js

// Importamos la conexión con Sequelize y los modelos
const db = require("../database/models");
const product = db.Product; // Product es el alias del modelo
const user = db.User;
const comment = db.Comment;
const op = db.Sequelize.Op;

module.exports = {
  // Renderiza el formulario para crear un nuevo producto
  create: (req, res) => {
    // Renderizamos la vista 'create' con el título y el usuario logueado
    res.render('create', { 
      title: 'Agregar producto'
    });
  },

  // Muestra el detalle de un producto
  detail: (req, res) => {
    const id = req.params.id;
  
    product.findByPk(id, {
      include: [
        { association: 'usuarioProducto' }, // dueño del producto
        { 
          association: 'comentariosProducto', // comentarios del producto
          include: [{ association: 'comentarioUsuario' }] // usuario de cada comentario
        }
      ]
    })
    .then(result => {
      if (!result) {
        return res.status(404).send('Producto no encontrado');
      }
      res.render('detail', { 
        title: result.name,
        product: result
      });
    })
    .catch(error => res.send(error));
  },

  // Muestra el formulario para editar un producto
  productEdit: (req, res) => {
    const id = req.params.id; // obtenemos el id del producto por parámetro

    // Buscamos el producto por id
    product.findByPk(id)
    .then(result => {
      if (!result) {
        return res.status(404).send('Producto no encontrado');
      }
      // Mostramos la vista 'productEdit' con ese producto
      res.render('productEdit', { 
        title: 'Editar producto', 
        product: result
      });
    })
    .catch(error => res.send(error));
  }
};

