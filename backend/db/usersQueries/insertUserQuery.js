const bcrypt = require('bcrypt');
const getConnection = require('../getConnection');
const { generateError } = require('../../helpers');

const insertUserQuery = async (
    alias,
    name,
    firstName,
    lastName,
    email,
    password,
    biography,
    image
) => {
    let connection;

    try {
        connection = await getConnection();

        // Obtenemos un array de usuarios que cumplan la condición establecida.
        const [users] = await connection.query(
            `SELECT id FROM users WHERE email = ? OR alias = ?`,
            [email, alias]
        );

        // Si el array de usuarios tiene algún usuario quiere decir que el email
        // ya está vinculado a otro usuario. Lanzamos un error.
        if (users.length > 0) {
            throw generateError(
                'Ya existe un usuario con ese email o alias en la base de datos.',
                409
            );
        }

        // Encriptamos la contraseña.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creamos el usuario.
        const [newUser] = await connection.query(
            `INSERT INTO users (alias, name, firstName, lastName, email, password, biography, image) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                alias,
                name,
                firstName,
                lastName,
                email,
                hashedPassword,
                biography,
                image,
            ]
        );

        // Retornamos el id del elemento creado.
        return newUser.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserQuery;
