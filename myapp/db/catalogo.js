module.exports = {
    usuario: {
      id: 1,
      email: 'maru@example.com',
      usuario: 'maru',
      contraseña: '123456',              
      fotoPerfil: '/img/avatar1.png'    
    },
  
    // 10 productos (catálogo de flores) 
    productos: [
      {
        id: 1,
        nombre: 'Rosa roja',
        imagen: '/img/rosa-roja.png',
        descripcion: 'Clásica y perfumada, ideal para ramos románticos. Tallo largo.',
        comentarios: [
          { nombreUsuario: 'mauro', texto: 'Perfecta para aniversario, llegó impecable.', imagenPerfil: '/img/avatar2.png' },
          { nombreUsuario: 'sofi',  texto: 'El color es súper intenso.',                   imagenPerfil: '/img/avatar3.png' },
          { nombreUsuario: 'fran',  texto: 'Duró más de una semana en agua.',             imagenPerfil: '/img/avatar4.png' }
        ]
      },
      {
        id: 2,
        nombre: 'Tulipán amarillo',
        imagen: '/img/tulipan-amarillo.png',
        descripcion: 'Flor de primavera con pétalos suaves y colores vibrantes.',
        comentarios: [
          { nombreUsuario: 'lola', texto: 'Me encantó para un regalo primaveral.', imagenPerfil: '/img/avatar1.png' },
          { nombreUsuario: 'maru', texto: 'Abrieron bien al segundo día.',          imagenPerfil: '/img/avatar5.png' },
          { nombreUsuario: 'sofi', texto: 'Traían tallos firmes y sanos.',          imagenPerfil: '/img/avatar3.png' }
        ]
      },
      {
        id: 3,
        nombre: 'Girasol',
        imagen: '/img/girasol.png',
        descripcion: 'Cabeza grande y luminosa que sigue la luz del sol.',
        comentarios: [
          { nombreUsuario: 'fran',  texto: 'Iluminó el living, enorme!',                imagenPerfil: '/img/avatar4.png' },
          { nombreUsuario: 'lola',  texto: 'Se bancó el calor sin problemas.',          imagenPerfil: '/img/avatar1.png' },
          { nombreUsuario: 'maru',  texto: 'Vino con hojas verdes y fuertes.',          imagenPerfil: '/img/avatar5.png' }
        ]
      },
      {
        id: 4,
        nombre: 'Lirio blanco',
        imagen: '/img/lirio-blanco.png',
        descripcion: 'Elegante, pétalos alargados y aroma sutil para arreglos formales.',
        comentarios: [
          { nombreUsuario: 'mauro', texto: 'Muy elegante para un casamiento.',  imagenPerfil: '/img/avatar2.png' },
          { nombreUsuario: 'maru',  texto: 'Aroma suave, no invasivo.',         imagenPerfil: '/img/avatar5.png' },
          { nombreUsuario: 'lola',  texto: 'Pétalos intactos, buen embalaje.',  imagenPerfil: '/img/avatar1.png' }
        ]
      },
      {
        id: 5,
        nombre: 'Peonía rosada',
        imagen: '/img/peonia-rosada.png',
        descripcion: 'Pétalos abundantes, aspecto romántico y suave fragancia.',
        comentarios: [
          { nombreUsuario: 'sofi',  texto: 'Soñadas, súper voluminosas.',         imagenPerfil: '/img/avatar3.png' },
          { nombreUsuario: 'mauro', texto: 'Combinan perfecto con eucalipto.',    imagenPerfil: '/img/avatar2.png' },
          { nombreUsuario: 'fran',  texto: 'La fragancia es leve y agradable.',   imagenPerfil: '/img/avatar4.png' }
        ]
      },
      {
        id: 6,
        nombre: 'Orquídea',
        imagen: '/img/orquidea.png',
        descripcion: 'Planta de interior, larga floración y cuidados mínimos.',
        comentarios: [
          { nombreUsuario: 'maru',  texto: 'Trae varias varas, hermosa.',                imagenPerfil: '/img/avatar5.png' },
          { nombreUsuario: 'sofi',  texto: 'La maceta venía con drenaje correcto.',      imagenPerfil: '/img/avatar3.png' },
          { nombreUsuario: 'mauro', texto: 'Color uniforme y flores firmes.',            imagenPerfil: '/img/avatar2.png' }
        ]
      },
      {
        id: 7,
        nombre: 'Hortensia azul',
        imagen: '/img/hortensia-azul.png',
        descripcion: 'Inflorescencias grandes, perfecta para centros de mesa.',
        comentarios: [
          { nombreUsuario: 'lola', texto: 'Las cabezas son bien grandes.',  imagenPerfil: '/img/avatar1.png' },
          { nombreUsuario: 'fran', texto: 'Pigmentación azul intensa.',     imagenPerfil: '/img/avatar4.png' },
          { nombreUsuario: 'maru', texto: 'La hidratación se mantuvo bien.',imagenPerfil: '/img/avatar5.png' }
        ]
      },
      {
        id: 8,
        nombre: 'Gerbera naranja',
        imagen: '/img/gerbera-naranja.png',
        descripcion: 'Colores intensos, pétalos radiados, muy resistente en florero.',
        comentarios: [
          { nombreUsuario: 'mauro', texto: 'Muy vistosas en ramos mixtos.', imagenPerfil: '/img/avatar2.png' },
          { nombreUsuario: 'lola',  texto: 'Tallitos rígidos, no se caen.', imagenPerfil: '/img/avatar1.png' },
          { nombreUsuario: 'fran',  texto: 'Aportan un toque alegre al arreglo.', imagenPerfil: '/img/avatar4.png' }
        ]
      },
      {
        id: 9,
        nombre: 'Clavel blanco',
        imagen: '/img/clavel-blanco.png',
        descripcion: 'Clásico, económico y de gran durabilidad.',
        comentarios: [
          { nombreUsuario: 'sofi',  texto: 'Duración excelente por el precio.',       imagenPerfil: '/img/avatar3.png' },
          { nombreUsuario: 'maru',  texto: 'Se abrieron de a poco, lindísimo efecto.',imagenPerfil: '/img/avatar5.png' },
          { nombreUsuario: 'lola',  texto: 'Perfectos para boutonnieres.',            imagenPerfil: '/img/avatar1.png' }
        ]
      },
      {
        id: 10,
        nombre: 'Lavanda',
        imagen: '/img/lavanda.png',
        descripcion: 'Aroma relajante, ideal para ramos secos y aromaterapia.',
        comentarios: [
          { nombreUsuario: 'fran',  texto: 'El aroma es espectacular.', imagenPerfil: '/img/avatar4.png' },
          { nombreUsuario: 'mauro', texto: 'Ideal para secar y guardar.', imagenPerfil: '/img/avatar2.png' },
          { nombreUsuario: 'sofi',  texto: 'Quedó divina en frascos decorativos.', imagenPerfil: '/img/avatar3.png' }
        ]
      }
    ]
  };
  