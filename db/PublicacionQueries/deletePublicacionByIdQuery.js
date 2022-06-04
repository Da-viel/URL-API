const getConnection = require('../getConnection');

const deletePublicacionByIdQuery = async (idPublicacion) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(`DELETE FROM publicaciones WHERE id = ?`, [
            idPublicacion,
        ]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deletePublicacionByIdQuery;
