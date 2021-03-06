// LLamada a los modulos necesarios
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const { PORT } = process.env;

const app = express();

app.use(morgan('dev'));

app.use(express.json());

/**
 * ########################
 * ## Endpoints Usuarios ##
 * ########################
 */
const authUser = require('./middlewares/authUser');
const {
    nuevoRegistro,
    accesoUsuario,
    verPublicaciones,
} = require('./controllers/usuarios');

// Crear un nuevo usuario
app.post('/registro', nuevoRegistro);

// Acceder con el usuario
app.post('/acceso', accesoUsuario);

// Seleccion de TODAS las publicaciones // Necesita token
app.get('/', authUser, verPublicaciones);

/**
 * #############################
 * ## Endpoints Publicaciones ##
 * #############################
 */

const {
    nuevaPublicacion,
    borrarPublicacion,
} = require('./controllers/publicacion');

// Crea una nueva publicación // Necesita token
app.post('/publicacion', authUser, nuevaPublicacion);

// Borrar una publicación // Necesita token
app.delete('/borrar/:idPublicacion', authUser, borrarPublicacion);

/**
 * ############################
 * ## Endpoints Valoraciones ##
 * ############################
 */

const votarPublicacion = require('./controllers/votacion/votarPublicacion');

// Votar publicaciones SOLO de otros usuarios y SOLO se permite una votación por publicación/usuario // Necesita token
app.post('/votacion', authUser, votarPublicacion);

/**
 * ######################
 * ## Middleware Error ##
 * ######################
 */

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).send({
        status: 'error',
        message: err.message,
    });
});

/**
 * ##########################
 * ## Middleware Not Found ##
 * ##########################
 */

app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found!',
    });
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
