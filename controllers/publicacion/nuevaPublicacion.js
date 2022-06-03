const insertPublicacionQuery = require('../../db/PublicacionQueries/insertPublicacionQuery');
const { generateError } = require('../../helpers');

const nuevaPublicacion = async (req, res, next) => {
    try {
        // Obtenemos los campos del body.
        const {
            //idUser,
            url,
            titulo,
            descripcion,
        } = req.body;

        // Si faltan campos lanzamos un error.
        if (!url || !titulo || !descripcion) {
            throw generateError('Faltan campos', 400);
        }

        // Creamos un usuario en la base de datos y obtenemos el id.
        //const idUser = await insertUsuarioQuery(url, titulo, descripcion);

        res.send({
            status: 'ok',
            message: 'Publicación creada',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = nuevaPublicacion;
