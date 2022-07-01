const getConnection = require('../getConnection');

const listArticleByIdQuery = async (idArticle) => {
    let connection;

    try {
        connection = await getConnection();

        let article;

        //Retornamos información sobre este artículo.
        [article] = await connection.query(
            `
            SELECT  articles.id,url,Title,Description,articles.createdAt, ROUND(AVG(rating),1) AS "Rating_articles", users.alias, users.image
            FROM articles
                LEFT JOIN ratings
                    ON articles.id = ratings.idArticle
					JOIN users ON  articles.idUser = users.id           
            WHERE articles.id = ?`,
            [idArticle]
        );
        return article;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = listArticleByIdQuery;
