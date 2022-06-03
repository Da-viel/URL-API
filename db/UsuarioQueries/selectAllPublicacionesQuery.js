const getConnection = require('../getConnection');

const selectAllPublicacionesQuery = async () => {
    let connection;

    try {
        connection = await getConnection();

        let publicaciones;

        // Si hay palabra clave "keyword" buscamos los tweets que contengan esa palabra
        // clave. De lo contrario retornamos todos los tweets.

        [publicaciones] = await connection.query(
            `
            SELECT url, titulo, descripcion FROM publicaciones
            `
        );
        return publicaciones;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllPublicacionesQuery;
