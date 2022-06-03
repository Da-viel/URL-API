const insertUsuarioQuery = require('../../db/UsuarioQueries/insertUsuarioQuery');
const { generateError } = require('../../helpers');

const nuevoRegistro = async (req, res, next) => {
    try {
        // Obtenemos los campos del body.
        const {
            alias,
            nombre,
            apellido_1,
            apellido_2,
            email,
            contraseña,
            biografia,
            foto,
        } = req.body;

        // Si faltan campos lanzamos un error.
        if (
            !alias ||
            !nombre ||
            !apellido_1 ||
            !apellido_2 ||
            !email ||
            !contraseña
        ) {
            throw generateError('Faltan campos', 400);
        }

        // Creamos un usuario en la base de datos y obtenemos el id.
        const idUser = await insertUsuarioQuery(
            alias,
            nombre,
            apellido_1,
            apellido_2,
            email,
            contraseña,
            biografia,
            foto
        );

        res.send({
            status: 'ok',
            message: `Usuario con id ${idUser} creado`,
        });
    } catch (error) {
        res.send({
            status: 'error',
            message: 'Usuario ya creado, redirigiendo al acceso',
        });
        //res.redirect(307, '/acceso');
    }
};

module.exports = nuevoRegistro;
