const db = require("../database/models");
const usuario = db.User;       // User es el alias del modelo
const producto = db.Product;   // Product es el alias del modelo
const bcrypt = require("bcryptjs");

const usuariosController = {
    miPerfil: function (req, res) {
      let ingresoId = req.params.id;
      // Buscamos al usuario en la BD
      usuario.findByPk(ingresoId)
        .then((userData) => {
          if (!userData) {
            return res.send("Usuario no encontrado");
          }
          // Buscamos los productos de ese usuario
          return producto.findAll({
            where: { userId: ingresoId },
            order: [['createdAt', 'DESC']],
            include: {
              all: true,
              nested: true
            },
            distinct: true // 👈 clave para evitar duplicados
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
    let autorPerfil = {};
    console.log("🔐 Sesión actual:", req.session.user);

    if (req.session.user != undefined) {
  
      usuario.findByPk(idUser)
        .then((result) => {
          autorPerfil.id = result.id;
          // return res.send(autorPerfil.id)
          if (req.session.user.id == autorPerfil.id) {
            return res.render("editarPerfil", { datos: result });
          } else {
            res.redirect("/users/detalleUsuario/id/" + idUser);
          }
        })
        .catch((error) => {
          return console.log(error);
        });
  
    } else {
  
      res.redirect("/users/detalleUsuario/id/" + idUser);
    }
  },  
  // ACTUALIZAR PERFIL (POST)
  updatePerfil: function (req, res) {
    let idUser = req.params.id;
    let autorPerfil = {};
    let info = req.body;

    if (info.clave < 3) {
      info.clave = req.session.user.password;
    } else {
      info.clave = bcrypt.hashSync(info.clave, 10);
    }
    let criterio = {
      where: [{ id: idUser }]
    };

    if (req.session.user != undefined) {
      usuario.findByPk(idUser)
        .then((result) => {
          autorPerfil.id = result.id;

          if (req.session.user.id == autorPerfil.id) {
            usuario.update(info, criterio)
              .then(() => {
                return res.redirect("/users/me/id/" + idUser);
              })
              .catch((error) => {
                return console.log(error);
              });
          } else {
            res.redirect("/users/me/id/" + idUser);
          }
        })
        .catch((error) => {
          return console.log(error);
        });
    } else {
      res.redirect("/user/me/id/" + idUser);
    }
  },
  // DETALLE DE OTRO USUARIO
  detalleUsuario: function (req, res) {
    let ingresoId = req.params.id;

    let relacion = {
      include: {
        all: true,
        nested: true
      }
    };
    usuario.findByPk(ingresoId, relacion)
      .then(function (result) {
        let totalProductos = result.productosUsuario.length;
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
