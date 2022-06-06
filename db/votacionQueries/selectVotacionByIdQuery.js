const getConnection = require('../getConnection');

const selectAllPublicacionesQuery = async (idUsuario, idPublicacion) => {
    let connection;

    try {
        connection = await getConnection();

        let publicaciones;

        [publicaciones] = await connection.query(
            `
            SELECT idUsuario, idPublicacion FROM votaciones WHERE idUsuario = ?
            `,
            [idUsuario]
        );
        return publicaciones;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllPublicacionesQuery;
