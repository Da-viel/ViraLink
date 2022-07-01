const listArticleByIdQuery = require('../../db/articlesQueries/listArticleByIdQuery');

const listArticleById = async (req, res, next) => {
    try {
        const { idArticle } = req.params;

        const article = await listArticleByIdQuery(idArticle);

        res.send({
            status: 'ok',
            data: {
                article,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = listArticleById;
