const getConnection = require('../getConnection');

const insertPublicacionQuery = async (url, titulo, descripcion, idUsuario) => {
    let connection;

    try {
        connection = await getConnection();
        const [nuevaPublicacion] = await connection.query(
            `INSERT INTO publicaciones (url, titulo, descripcion, idUsuario) VALUES(?, ?, ?, ?)`,
            [url, titulo, descripcion, idUsuario]
        );

        // Retornamos el id del elemento creado.
        return nuevaPublicacion.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertPublicacionQuery;
