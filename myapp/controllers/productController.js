// /controllers/productController.js
// Importamos la conexión con Sequelize y los modelos
const db = require("../database/models");
const product = db.Product; // Product es el alias del modelo
const user = db.User;
const comment = db.Comment;
const op = db.Sequelize.Op;
module.exports = {
  //agregar producto
  create: (req, res) => {
    // si no está logueado, lo mandamos al login para proteger la url
    if (!req.session.user) {
      return res.redirect("/login");
    }
    // si está logueado, renderizamos el form
    return res.render('create', { 
      title: 'Agregar producto'
    });
  },
  //formulario creacion producto
  store: function (req, res) {
    if (!req.session.user) {
      // si no está logueado, lo mando al login
      return res.redirect("/users/login");
    }
    let info = req.body;
    // return res.send(info) // para testear lo que llega del form
    let newProduct = {
      imageFilename: info.imageFilename, // nombre o URL del archivo
      name: info.name,
      description: info.description,
      userId: req.session.user.id, // FK del usuario logueado
      createdAt: new Date()
    };
    product.create(newProduct)
      .then((result) => {
        // después de crear el producto, redirigimos al perfil del usuario
        return res.redirect("/users/me/id/" + newProduct.userId);
      })
      .catch((error) => {
        console.log(error);
        return res.send("Ocurrió un error al crear el producto.");
      });
  },
  // Muestra el detalle de un producto
  detail: (req, res) => {
    const id = req.params.id;
  
    product.findByPk(id, {
      include: [ // relacion anidada
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
  // editar un producto
  productEdit: (req, res) => {
     // verificamos si hay usuario logueado, para proteger la url
    if (req.session.user == undefined) {
    return res.redirect('/users/login');
    }
    const id = req.params.id; // obtenemos el id del producto por parámetro
    product.findByPk(id)// Buscamos el producto por id
    .then(result => {
      if (!result) {
        return res.status(404).send('Producto no encontrado');
      }
      // Mostramos la vista 'productEdit' con ese producto
      res.render('productEdit', { 
        title: 'Editar producto', 
        product: result,
        user: req.session.user
      });
    })
    .catch(error => res.send(error));
  },
  // formulario edicion producto 
  update: function (req, res) {
    let idProducto = req.params.id;
    let info = {
      imageFilename: req.body.image,
      name: req.body.name,
      description: req.body.description
    };
    let criterio = {
      where: [{ id: idProducto }]
    };
    // 1Verificamos si hay usuario logueado
    if (req.session.user != undefined) {
  
      // Buscamos el producto para validar si existe y si es del usuario logueado
      product.findByPk(idProducto)
        .then((result) => {
          if (!result) {
            return res.status(404).send("Producto no encontrado");
          }
          let autorProducto = result.userId;
          // Si el producto pertenece al usuario logueado, actualiza
          if (req.session.user.id == autorProducto) {
            product.update(info, criterio)
              .then(() => {
                return res.redirect("/products/" + idProducto);
              })
              .catch((error) => {
                console.log("Error al actualizar el producto:", error);
                return res.status(500).send("Error al actualizar el producto");
              });
  
          } else {
            // 4Si no es el dueño, redirige al detalle sin actualizar
            return res.redirect("/products/" + idProducto);
          }
        })
        .catch((error) => {
          console.log("Error al buscar producto:", error);
          return res.status(500).send("Error al buscar producto");
        });
  
    } else {
      // Si no está logueado, redirige
      return res.redirect("/users/login");
    }
  }, 
  createComment: (req, res) => {
    const idProducto = req.params.id;
    // Si el usuario no está logueado, redirigimos al login
    if (!req.session.user) {
      return res.redirect('/users/login');
    }
    const newComment = {
      body: req.body.body,
      userId: req.session.user.id,
      productId: idProducto,
      createdAt: new Date()
    };
  
    comment.create(newComment)
      .then(() => {
        // Redirigimos de nuevo al detalle del producto
        return res.redirect('/products/' + idProducto);
      })
      .catch(error => {
        console.log('Error al crear comentario:', error);
        return res.status(500).send('Error al agregar comentario');
      });
  } 
}