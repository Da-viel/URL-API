const getConnection = require('./getConnection');
const chalk = require('chalk');

async function main() {
    let connection;

    try {
        connection = await getConnection();

        console.log(chalk.yellow('Inicializando DB'));

        await connection.query('DROP TABLE IF EXISTS votaciones');
        await connection.query('DROP TABLE IF EXISTS publicaciones');
        await connection.query('DROP TABLE IF EXISTS usuarios');

        console.log(chalk.green('Creando tablas...'));

        await connection.query(`
            CREATE TABLE usuarios (
                id INT PRIMARY KEY AUTO_INCREMENT,
                alias VARCHAR(20) NOT NULL,
                nombre VARCHAR(50) NOT NULL,
                apellido_1 VARCHAR(50) NOT NULL,
                apellido_2 VARCHAR(50) NOT NULL,
                email VARCHAR(50) UNIQUE NOT NULL,
                contraseña VARCHAR(500) UNIQUE NOT NULL,
                biografia VARCHAR(500),
                foto VARCHAR(200),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE publicaciones (
                id INT PRIMARY KEY AUTO_INCREMENT,
                idUsuario INTEGER NOT NULL,
                FOREIGN KEY (idUsuario) REFERENCES usuarios(id),
                url VARCHAR(200) NOT NULL,
                titulo VARCHAR(100) NOT NULL,
                descripcion VARCHAR(200) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE votaciones (
                id INT PRIMARY KEY AUTO_INCREMENT,
                idUsuario INTEGER NOT NULL,
                FOREIGN KEY (idUsuario) REFERENCES usuarios(id),
                idPublicacion INTEGER NOT NULL,
                FOREIGN KEY (idPublicacion) REFERENCES publicaciones(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        console.log(chalk.green('Tablas creadas'));

        await connection.query(`
            INSERT INTO usuarios (alias, nombre, apellido_1, apellido_2, email, contraseña)
            VALUES ("Demos", "demo", "demo", "demo", "demo@gmail.com", "demo")
        `);

        await connection.query(`
        INSERT INTO publicaciones (idUsuario, url, titulo, descripcion) 
        VALUES(2,"google.com", "GOOGLE", "Url que nos lleva a google")
    `);
        console.log(chalk.green('Usuario demo creado'));
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
}

main();
