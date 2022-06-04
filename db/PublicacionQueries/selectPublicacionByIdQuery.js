const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const selectPublicacionByIdQuery = async (idPublicacion) => {
    let connection;

    try {
        connection = await getConnection();
        const [selectPublicacion] = await connection.query(
            `SELECT idUsuario FROM publicaciones WHERE id= ?`,
            [idPublicacion]
        );

        if (selectPublicacion.length < 1)
            throw generateError('Publicación no encontrada', 404);

        return selectPublicacion[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectPublicacionByIdQuery;
