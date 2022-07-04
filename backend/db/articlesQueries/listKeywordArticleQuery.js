const getConnection = require('../getConnection');

const listKeywordArticleQuery = async (keyword) => {
    let connection;

    try {
        connection = await getConnection();

        const aux = `%${keyword}%`;

        let article;

        [article] = await connection.query(
            `
            SELECT  articles.id,url,Title,Description,articles.createdAt, ROUND(AVG(rating),1) AS "Rating_articles", users.alias, users.image
            FROM articles
            LEFT JOIN ratings
            ON articles.id = ratings.idArticle
            JOIN users ON  articles.idUser = users.id
            WHERE 
            articles.description like ?
            OR articles.title like ?
            group by articles.id
            `,
            [aux, aux]
        );
        return article;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = listKeywordArticleQuery;
