const getConnection = require('../getConnection');

const listKeywordArticleQuery = async (keyword) => {
    let connection;

    try {
        connection = await getConnection();

        const aux = `%${keyword}%`;

        let article;

        [article] = await connection.query(
            `
            SELECT url,Title,Description, ROUND(AVG(rating),2) AS "Rating_articles"
            FROM articles
            LEFT JOIN ratings
            ON articles.id = ratings.idArticle
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
