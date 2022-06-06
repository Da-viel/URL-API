const insertVotacionByIdQuery = require('../../db/votacionQueries/insertVotacionByIdQuery');
const selectVotacionByIdQuery = require('../../db/votacionQueries/selectVotacionByIdQuery');
const { generateError } = require('../../helpers');

const votarPulicacion = async (req, res, next) => {
    try {
        const { idUsuario: id } = req.header;
        const { votacion, idPublicacion } = req.body;

        if (!votacion) {
            throw generateError('Faltan campos', 400);
        }

        const resultado = await selectVotacionByIdQuery(idUsuario);

        res.send({
            status: 'ok',
            message: 'Publcacion votada',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = votarPulicacion;
