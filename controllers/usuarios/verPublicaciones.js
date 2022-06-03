const selectAllPublicacionesQuery = require('../../db/UsuarioQueries/selectAllPublicacionesQuery');

const verPublicaciones = async (req, res, next) => {
    try {
        const publicaciones = await selectAllPublicacionesQuery();

        res.send({
            status: 'ok',
            data: {
                publicaciones,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = verPublicaciones;
