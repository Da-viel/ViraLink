// LLamada a los modulos necesarios
require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');

const { PORT } = process.env;

const app = express();

//Usamos el middleware "morgan" para llevar un registro de peticiones http
app.use(morgan('dev'));

// Con este middleware podemos crear peticiones de front a back
app.use(cors());

//Deserializamos un body con formato "raw"
app.use(express.json());

//Deserializamos un body con formato "form-data"
app.use(fileUpload());

// Indicamos a express en que directorio están los archivos estáticos.
app.use(express.static('uploads'));

/**
 * ########################
 * ## Endpoints Usuarios ##
 * ########################
 */
const authUser = require('./middlewares/authUser');
const {
    newUser,
    loginUser,
    editUser,
    getOwnUser,
} = require('./controllers/users');

// Crear un nuevo usuario
app.post('/users', newUser);

// Acceder con el usuario.
app.post('/login', loginUser);

//Editar el perfil del usuario.   ** Necesita token **
app.put('/users', authUser, editUser);

// Información sobre el usuario del token.  ** Necesita token **
app.get('/users', authUser, getOwnUser);

/**
 * #############################
 * ## Endpoints Publicaciones ##
 * #############################
 */

const articleExists = require('./middlewares/articleExists');
const {
    newArticle,
    deleteArticle,
    listArticles,
    listKeywordArticle,
} = require('./controllers/article');

// Crea una nueva publicación.  ** Necesita token **
app.post('/article', authUser, newArticle);

// Seleccion de TODAS las publicaciones, incluyendo información sobre el rating   ** Necesita token **
app.get('/article', authUser, listArticles);

// Selecciona una publicacion, incluyendo información sobre el rating   ** Necesita token **
app.get('/article/:keyword', authUser, listKeywordArticle);

// Elimina una publicación si eres el dueño.   ** Necesita token **
app.delete('/article/:idArticle', authUser, articleExists, deleteArticle);

/**
 * ############################
 * ## Endpoint Valoraciones ##
 * ############################
 */

const newRating = require('./controllers/ratings/newRating');

//Votar publicaciones SOLO de otros usuarios y SOLO se permite una votación por publicación/usuario. ** Necesita token **
app.post('/article/:idArticle/rating', authUser, articleExists, newRating);

/**
 * ######################
 * ## Middleware Error ##
 * ######################
 */

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).send({
        status: 'error',
        message: err.message,
    });
});

/**
 * ##########################
 * ## Middleware Not Found ##
 * ##########################
 */

app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found!',
    });
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
