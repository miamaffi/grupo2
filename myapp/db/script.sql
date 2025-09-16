/* PUNTO 4 */ 
CREATE SCHEMA catalogoFlores;
USE catalogoFlores;

/* TABLA USERS */
CREATE TABLE users (
  /* identificador único del usuario, numérico y autoincremental */
  id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  /*correo electrónico del usuario, único y obligatorio. */
  email VARCHAR(255) NOT NULL UNIQUE,
  /*nombre de usuario, único y obligatorio*/
  username VARCHAR(50) NOT NULL UNIQUE,
  /* contraseña del usuario, obligatoria */
  password VARCHAR(255) NOT NULL,
  /* Nombre del archivo de la foto de perfil (opcional) */
  profilePhoto VARCHAR(255) NULL,
  /* fecha y hora de creación del registro, valor por defecto la fecha actual */
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  /*fecha y hora de última actualización, se actualiza automáticamente en cada cambio */
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  /* fecha y hora de eliminación lógica (NULL si el registro no está borrado) */ 
  deletedAt TIMESTAMP NULL DEFAULT NULL
);

/* TABLA PRODUCTOS */
CREATE TABLE products (
  /* identificador único del producto, numérico y autoincremental */
  id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  /* ID del usuario que cargó el producto (relación con la tabla users) */
  userId INT UNSIGNED NOT NULL,
  /* Nombre del archivo de imagen asociado al producto */
  imageFilename VARCHAR(255) NOT NULL,
  /* Nombre del producto */
  name VARCHAR(150) NOT NULL,
  /*descripción detallada del producto (texto sin límite definido) */
  description TEXT NOT NULL,
  /*fecha y hora de creación del registro, por defecto la fecha actual */
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  /* Fecha y hora de última actualización, se actualiza automáticamente en cada cambio */
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  /* Fecha y hora de eliminación lógica (NULL si el registro sigue activo) */
  deletedAt TIMESTAMP NULL DEFAULT NULL,
  /* Clave foránea: relaciona userId con la tabla users(id). */
	FOREIGN KEY (userId) REFERENCES users(id)
);

/* TABLA COMMENTS */
CREATE TABLE comments (
  /* Identificador único del comentario, numérico y autoincremental */
  id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  /* ID del producto sobre el cual se realiza el comentario (relación con products) */
  productId INT UNSIGNED NOT NULL,
  /* ID del usuario que creó el comentario (relación con users) */
  userId INT UNSIGNED NOT NULL,
  /* Texto del comentario, no limitado por eso no tiene va */
  body TEXT NOT NULL,
  /* Fecha y hora de creación del registro, valor por defecto la fecha actual */
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  /* Fecha y hora de última actualización, se actualiza automáticamente en cada cambio */
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  /* Fecha y hora de eliminación lógica (NULL si el registro sigue activo) */
  deletedAt TIMESTAMP NULL DEFAULT NULL,
  /* Clave foránea: relaciona productId con products(id). */ 
    FOREIGN KEY (productId) REFERENCES products(id),
  /* Clave foránea: relaciona userId con users(id).*/
    FOREIGN KEY (userId) REFERENCES users(id)
);

/* insertamos 5 usuarios */
INSERT INTO users (email, username, password, profilePhoto) VALUES
('lola@example.com',  'lola',  '123456', '/img/avatar1.png'),
('mauro@example.com', 'mauro', '123456', '/img/avatar2.png'),
('sofi@example.com',  'sofi',  '123456', '/img/avatar3.png'),
('fran@example.com',  'fran',  '123456', '/img/avatar4.png'),
('maru@example.com',  'maru',  '123456', '/img/avatar5.png');

/* inserto 10 flores */
INSERT INTO products (userId, imageFilename, name, description) VALUES
(1, '/img/rosa-roja.png',      'Rosa roja',         'Clásica y perfumada, ideal para ramos románticos. Tallo largo.'),
(2, '/img/tulipan-amarillo.png','Tulipán amarillo',  'Flor de primavera con pétalos suaves y colores vibrantes.'),
(3, '/img/girasol.png',         'Girasol',           'Cabeza grande y luminosa que sigue la luz del sol.'),
(4, '/img/lirio-blanco.png',    'Lirio blanco',      'Elegante, pétalos alargados y aroma sutil para arreglos formales.'),
(5, '/img/peonia-rosada.png',   'Peonía rosada',     'Pétalos abundantes, aspecto romántico y suave fragancia.'),
(1, '/img/orquidea.png','Orquídea','Planta de interior, larga floración y cuidados mínimos.'),
(2, '/img/hortensia-azul.png',  'Hortensia azul',    'Inflorescencias grandes, perfecta para centros de mesa.'),
(3, '/img/gerbera-naranja.png', 'Gerbera naranja',   'Colores intensos, pétalos radiados, muy resistente en florero.'),
(4, '/img/clavel-blanco.png',   'Clavel blanco',     'Clásico, económico y de gran durabilidad.'),
(5, '/img/lavanda.png',         'Lavanda',           'Aroma relajante, ideal para ramos secos y aromaterapia.');

/* inserto 3 comentarios por producto */
INSERT INTO comments (productId, userId, body) VALUES
/* 1 Rosa roja */
(1, 2, 'Perfecta para aniversario, llegó impecable.'),
(1, 3, 'El color es súper intenso.'),
(1, 4, 'Duró más de una semana en agua.'),
/* 2 Tulipán amarillo */
(2, 1, 'Me encantó para un regalo primaveral.'),
(2, 5, 'Abrieron bien al segundo día.'),
(2, 3, 'Traían tallos firmes y sanos.'),
/* 3 Girasol */
(3, 4, 'Iluminó el living, enorme!'),
(3, 1, 'Se bancó el calor sin problemas.'),
(3, 5, 'Vino con hojas verdes y fuertes.'),
/* 4 Lirio blanco */
(4, 2, 'Muy elegante para un casamiento.'),
(4, 5, 'Aroma suave, no invasivo.'),
(4, 1, 'Pétalos intactos, buen embalaje.'),
/* 5 Peonía rosada */
(5, 3, 'Soñadas, súper voluminosas.'),
(5, 2, 'Combinan perfecto con eucalipto.'),
(5, 4, 'La fragancia es leve y agradable.'),
/* 6 Orquídea Phalaenopsis */
(6, 5, 'Trae varias varas, hermosa.'),
(6, 3, 'La maceta venía con drenaje correcto.'),
(6, 2, 'Color uniforme y flores firmes.'),
/* 7 Hortensia azul */
(7, 1, 'Las cabezas son bien grandes.'),
(7, 4, 'Pigmentación azul intensa.'),
(7, 5, 'La hidratación se mantuvo bien.'),
/* 8 Gerbera naranja */
(8, 2, 'Muy vistosas en ramos mixtos.'),
(8, 1, 'Tallitos rígidos, no se caen.'),
(8, 4, 'Aportan un toque alegre al arreglo.'),
/* 9 Clavel blanco */
(9, 3, 'Duración excelente por el precio.'),
(9, 5, 'Se abrieron de a poco, lindísimo efecto.'),
(9, 1, 'Perfectos para boutonnieres.'),
/* 10 Lavanda */
(10, 4, 'El aroma es espectacular.'),
(10, 2, 'Ideal para secar y guardar.'),
(10, 3, 'Quedó divina en frascos decorativos.');

