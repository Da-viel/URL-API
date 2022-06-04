const deletePublicacionByIdQuery = require('../../db/PublicacionQueries/deletePublicacionByIdQuery');
const selectPublicacionByIdQuery = require('../../db/PublicacionQueries/selectPublicacionByIdQuery');
const { generateError } = require('../../helpers');

const borrarPublicacion = async (req, res, next) => {
    try {
        const { idPublicacion } = req.params;

        const publicacion = await selectPublicacionByIdQuery(idPublicacion);

        // Comprobamos si el usuario tiene permisos para borrar la publicacion.
        if (req.idUser !== publicacion.idUsuario) {
            throw generateError(
                'No tiene autorización para borrar esta publicación.',
                401
            );
        }

        await deletePublicacionByIdQuery(idPublicacion);

        res.send({
            status: 'ok',
            message: `La publicación ha sido borrada.`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = borrarPublicacion;
