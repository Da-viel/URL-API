const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectUsuarioByEmailQuery = async (email) => {
    let connection;

    try {
        connection = await getConnection();

        const [users] = await connection.query(
            `SELECT id, contraseña FROM usuarios WHERE email = ?`,
            [email]
        );

        if (users.length < 1) {
            throw generateError('Usuario no encontrado', 404);
        }

        return users[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUsuarioByEmailQuery;
