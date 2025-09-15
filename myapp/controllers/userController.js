// Placeholder para Punto 1 (luego lo reemplazamos por el módulo de datos)
const me = {
  username: 'usuario_demo',
  email: 'demo@example.com',
};

module.exports = {
  login: (req, res) => res.render('login', { title: 'Login' }),
  register: (req, res) => res.render('register', { title: 'Registración' }),
  me: (req, res) => res.render('me', { title: 'Mi Perfil', user: me }),
};

