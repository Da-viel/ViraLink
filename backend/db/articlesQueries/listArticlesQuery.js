const getConnection = require('../getConnection');

const listArticlesQuery = async () => {
    let connection;

    try {
        connection = await getConnection();

        let articles;

        //Retornamos todos los artículos publicados hasta la fecha, añadiendo una columna que muestra
        //una clasificación de los artículos con su correspondiente rating.
        [articles] = await connection.query(
            `
            SELECT  articles.id,url,Title,Description,articles.createdAt, ROUND(AVG(rating),1) AS "Rating_articles", users.alias, users.image
            FROM articles
                LEFT JOIN ratings
                    ON articles.id = ratings.idArticle
					JOIN users ON  articles.idUser = users.id
            GROUP BY articles.id, url, title, description, articles.createdAt
            ORDER BY articles.createdAt DESC;
            `
        );
        return articles;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = listArticlesQuery;
