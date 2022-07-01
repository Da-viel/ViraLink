const listKeywordArticleQuery = require('../../db/articlesQueries/listKeywordArticleQuery');
const { generateError } = require('../../helpers');

const listKeywordArticle = async (req, res, next) => {
    try {
        const { keyword } = req.params;
        const articles = await listKeywordArticleQuery(keyword);

        if (!articles[0]) throw generateError('Publicación no encontrada', 404);

        res.send({
            status: 'ok',
            data: {
                articles,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = listKeywordArticle;
