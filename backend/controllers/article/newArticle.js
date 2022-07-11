const insertArticleQuery = require('../../db/articlesQueries/insertArticleQuery');
const { generateError } = require('../../helpers');

const newArticle = async (req, res, next) => {
    try {
        // Obtenemos los campos del body y del header
        const { url, title, description } = req.body;
        const idUser = req.idUser;
        let newUrl;

        if (!url || !title || !description) {
            // Si faltan campos lanzamos un error.
            throw generateError('Faltan campos', 400);
        }

        //Comprobamos que la url incluye el protocolo de Internet. En caso contrario,
        // lo añadiremos a la url enviada desde el front-end
        if (!url.includes('https://')) {
            newUrl = 'https://' + url;
        } else {
            newUrl = url;
        }

        const idArticle = await insertArticleQuery(
            newUrl,
            title,
            description,
            idUser
        );

        res.send({
            status: 'ok',
            message: `Publicación creada con número de id ${idArticle}`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newArticle;
