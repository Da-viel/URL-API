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

        const idPublicacion = await insertPublicacionQuery(
            url,
            titulo,
            descripcion,
            req.idUser
        );

        res.send({
            status: 'ok',
            message: `Publicación creada con número de id ${idPublicacion}`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = nuevaPublicacion;
