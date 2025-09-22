// Traigo los datos desde el módulo localData
const data = require('../db/catalogo');

module.exports = {
  // Muestra la vista de login
  login: (req, res) => {
    res.render('login', { title: 'Login', });
  },

  // Muestra la vista de registro
  register: (req, res) => {
    res.render('register', { title: 'Registración', });
  },

   // Pasamos usuario y productos al EJS
   me: (req, res) => {
    res.render('me', { 
      title: 'Mi Perfil', 
      user: data.usuario,     // ahora la vista puede usar usuario.fotoPerfil, usuario.email, etc.
      productos: data.productos,  // opcional, si querés mostrar sus productos
      logueado: false
    });
  
  }
};
