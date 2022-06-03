const bcrypt = require('bcrypt');
const getConnection = require('../getConnection');
const { generateError } = require('../../helpers');

const insertUsuarioQuery = async (
    alias,
    nombre,
    apellido_1,
    apellido_2,
    email,
    contraseña,
    biografia,
    foto
) => {
    let connection;

    try {
        connection = await getConnection();

        // Obtenemos un array de usuarios que cumplan la condición establecida.
        const [users] = await connection.query(
            `SELECT id FROM usuarios WHERE email = ?`,
            [email]
        );

        // Si el array de usuarios tiene algún usuario quiere decir que el email
        // ya está vinculado a otro usuario. Lanzamos un error.
        if (users.length > 0) {
            throw generateError(
                'Ya existe un usuario con ese email en la base de datos acceda a la ventana de acceso',
                409
            );
        }

        // Encriptamos la contraseña.
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Creamos el usuario.
        const [newUser] = await connection.query(
            `INSERT INTO usuarios (alias, nombre, apellido_1, apellido_2, email, contraseña, biografia, foto) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                alias,
                nombre,
                apellido_1,
                apellido_2,
                email,
                hashedPassword,
                biografia,
                foto,
            ]
        );

        // Retornamos el id del elemento creado.
        return newUser.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUsuarioQuery;
