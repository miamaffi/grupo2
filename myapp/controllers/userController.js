const db = require("../database/models");
const usuario = db.User;       // User es el alias del modelo
const producto = db.Product;   // Product es el alias del modelo
const bcrypt = require("bcryptjs");

const usuariosController = {
    miPerfil: function (req, res) {
      let ingresoId = req.params.id;
      usuario.findByPk(ingresoId)// buscamos al usuario en la BD
        .then((userData) => {
          if (!userData) {
            return res.send("Usuario no encontrado");
          }
          return producto.findAll({ // Buscamos los productos de ese usuario
            where: { userId: ingresoId }, // filtro
            include: [
              { association: "usuarioProducto" }, // relación product user
              { association: "comentariosProducto" }// relación product comment
            ],
          })
          .then((productos) => {
            res.render('me', { 
              idUser: ingresoId,
              user: userData, 
              productos: productos,
            });
          });
        })
        .catch((error) => {
          console.log(error);
          res.send("Error al cargar el perfil");
        });
    },
  // FORMULARIO EDITAR PERFIL
  editarPerfil: function (req, res) {
    let idUser = req.params.id;
    let autorPerfil = {}; //guarda los datos del prfil
    console.log("Sesión actual:", req.session.user);

    if (req.session.user != undefined) {
      usuario.findByPk(idUser)
        .then((result) => {
          autorPerfil.id = result.id; //guarda id usuario encontrado
          if (req.session.user.id == autorPerfil.id) { //si es dueño
            return res.render("editarPerfil", { datos: result });
          } else { // si no es dueño
            res.redirect("/users/detalleUsuario/id/" + idUser);
          }
        })
        .catch((error) => {
          return console.log(error);
        });
    } else { //si no hay sesion
      res.redirect("/users/detalleUsuario/id/" + idUser);
    }
  },  
  // DETALLE DE OTRO USUARIO
  detalleUsuario: function (req, res) {
    let ingresoId = req.params.id;
    let relacion = {
      include: [
        { association: "productosUsuario" } //relacion con alias modelo user
      ]
    };
    usuario.findByPk(ingresoId, relacion)
      .then(function (result) {
        let totalProductos = result.productosUsuario.length; // cantidad total productos usuario
        res.render('detalleUsuario', { 
          userId: ingresoId, 
          listaAboutUsuario: result, 
          listaProductos: result.productosUsuario,
          totalProductos: totalProductos,
        });
      })
      .catch(function (error) {
        res.send(error);
      });
  },
}
module.exports = usuariosController;
