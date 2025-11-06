///controllers/indexController.js
const db = require("../database/models");
const producto = db.Product;  // Product es el alias del modelo
const usuario = db.User;    // User es el alias del modelo
const comentario = db.Comment; //Comment es el alias del modelo 
const op = db.Sequelize.Op;
const bcrypt = require("bcryptjs"); //importa bcrypt para encriptar contra

const indexController = {
    index :function(req, res) {
        let filtro = { 
            order : [['createdAt', 'DESC']], //ordena los productos del mas nuevo al mas viejo
            include: [
                { association: 'usuarioProducto' },// dueño del producto
                // comentarios del producto y, dentro, el usuario que comentó
                { association: 'comentariosProducto', include: [{ association: 'comentarioUsuario' }] }
            ]
        };
        producto.findAll(filtro) //busca todos los productos segun ese filtro
        .then(function(result) {
            // mando toda la información a la vista
            return res.render('index', { dataCompleta: result });
        })
        .catch(function(error) {
          return res.send(error);
        });
    },
    //login
    login: function (req, res) {
        if (req.session.user != undefined) {
            return res.redirect("/"); //si ya esta slogueada te manda al home
        } else {
            return res.render('login');
        }
    },
    //loginpost
    loginPost: function (req,res,next) {
        let emailBuscado = req.body.email;     // name="email"
        let clave = req.body.password;         // name="password"
        let rememberMe= req.body.remember;     // name="remember"
        /*Validación de formularios*/
        let errors = {};
        if (emailBuscado == "") {
            errors.message = "El campo email está vacío";
            res.locals.errors = errors;
            return res.render("login");
        } else if (clave == "") {
            errors.message = "El campo clave está vacío";
            res.locals.errors = errors;
            return res.render("login");
        } else {
            let criterio ={
                where: [{ email: emailBuscado }]
            };
            usuario.findOne(criterio)
            .then(function(result){
                if (result != null){
                    // en tu modelo, el hash está en 'password'
                    let check = bcrypt.compareSync(clave, result.password);
                    if (check) { 
                        // Sesión del usuario
                        req.session.user = result.dataValues;

                        // Recordarme (cookie simple con id)
                        if(rememberMe != undefined){
                            res.cookie("UserId", result.id, { maxAge: 2000*60*5 });
                        }
                        // Redirección post login (home o perfil)
                        return res.redirect ("/");

                    } else {
                        // contraseña incorrecta
                        return res.send("La contraseña es incorrecta.");
                    }
                } else {
                    // mail no existe
                    return res.send("Este mail es incorrecto.");
                }
            })
            .catch(function(error){
                console.log(error);
                return res.send("Ocurrió un error al intentar iniciar sesión.");
            });
        }
    },
    // Logout
    logout : function (req, res) {
        // limpiar cookie de recordarme
        res.clearCookie('UserId');
        // destruir sesión
        req.session.destroy(function(){
            return res.redirect('/login');
        });
    },
    //registro
    registro: function (req, res) {
  if (req.session.user != undefined) {
      return res.redirect("/");
  } else {
      // usás la vista "register"
      return res.render('register');
  }
    },
    store:function (req,res,next) {

  let info = req.body;

  /*Validamos lo que se ingresa */
  let errors = {};

  // validaciones básicas (como en tus apuntes)
  if (info.email == "") {
      errors.message = "El campo email está vacío";
      res.locals.errors = errors;
      return res.render("register");
  
  } else if(info.clave == ""){
      errors.message = "El campo contraseña está vacío";
      res.locals.errors = errors;
      return res.render("register");
  } else if(info.clave.length < 3){ 
      errors.message = "¡Ups! El campo contraseña debe contener más de tres caracteres";
      res.locals.errors = errors;
      return res.render("register");
  } else if(info.nombre == ""){
      errors.message = "¡Ups! El campo nombre se encuentra vacío";
      res.locals.errors = errors;
      return res.render("register");
  }
  // VALIDACIÓN DE EMAIL 
  let criterio ={
      where: [{ email: info.email }]
  };
  usuario.findOne(criterio)
  .then(function(result){
      if (result != null){
          errors.message = "El campo email se encuentra repetido";
          res.locals.errors = errors;
          return res.render('register');
      }
      // crear usuario (hash de contraseña)
      let user = { 
          username     : info.nombre,
          email        : info.email,
          password     : bcrypt.hashSync(info.clave,10), // guarda hasheada
          profilePhoto : info.fotoPerfil
          // createdAt/updatedAt automáticos con timestamps:true
      };
      usuario.create(user)
      .then(function(){
          return res.redirect("/login");
      })
      .catch(function(error){
          // si UNIQUE (email) u otro error de inserción
          return res.send("No se pudo registrar: el email ya existe o los datos son inválidos.");
      });
  })
  .catch(function(error){
      console.log(error);
      return res.send("Ocurrió un error al validar el email. Intentá nuevamente.");
  });
    },

    busqueda: function (req, res) {
      // capturo la qs desde el header: name="q"
      let busqueda = req.query.q;         
      // ej: http://localhost:3000/search?q=rosa
  
      let filtro = {
          //****ACA VA EL ORDER, LIMIT,WHERE***
          where: {                        // ← OBJETO para que Sequelize filtre bien
              name: { [op.like]: `%${busqueda}%` }  // comodín: AVA -> AVATAR
          },
          order : [['createdAt', 'DESC']],
          limit: 10,
          include: { 
              all: true, 
              nested: true
          }
      }; 
  
      producto.findAll(filtro) 
      .then(function (results) {
          // el mensaje se maneja en la vista con dataCompleta.length == 0
          return res.render('results', { dataCompleta: results, criterio: busqueda });
      })
      .catch(function (error) {
          return res.send(error);
      });
    }, 
  }
module.exports = indexController;