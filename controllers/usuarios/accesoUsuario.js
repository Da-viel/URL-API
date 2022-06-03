const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const selectUserByEmailQuery = require('../../db/UsuarioQueries/selectUsuarioByEmailQuery');

const { generateError } = require('../../helpers');

const accesoUsuario = async (req, res, next) => {
    try {
        const { email, contraseña } = req.body;

        if (!email || !contraseña) {
            throw generateError('Faltan campos', 400);
        }

        // Obtenemos al usuario con el email del body.
        const user = await selectUserByEmailQuery(email);

        // Comprobamos si las contraseñas coinciden.
        const validPassword = await bcrypt.compare(contraseña, user.contraseña);

        if (!validPassword) {
            await generateError('Contraseña incorrecta', 401);
        }

        // Información que queremos guardar en el token.
        const payload = {
            id: user.id,
        };

        // Firmamos el token.
        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '30d',
        });

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = accesoUsuario;
