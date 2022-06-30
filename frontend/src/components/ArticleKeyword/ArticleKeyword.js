import { useEffect, useState } from "react";
import { useToken } from "../../context/TokenContext";
import Navigation from "../Navigation/Navigation";

import "./ArticleKeyword.css";

const ArticleKeyword = ({ keyword }) => {
  const [token] = useToken();
  const [loading, setLoading] = useState(false);
  const [articleKeyword, setArticleKeyword] = useState(null);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(null);

  const getArticleKeyword = async () => {
    setLoading(true);

    // Vaciamos el error.
    setError(null);

    // Si hay token nos interesa mandarlo para comprobar los articles de los que somos dueños.

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/article/${keyword}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );

      const body = await res.json();
      console.log(body.data);
      if (body.status === "error") setError(body.message);

      setArticleKeyword(body.data.articles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Mediante "useEffect" hacemos que la primera vez que se monta el componente se
  // cargue de forma automática la lista de articles.
  useEffect(() => {
    getArticleKeyword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  return (
    <>
      <main className="articleSearch">
        <Navigation />
        {error && <p className="Error">{error}</p>}

        {articleKeyword && (
          <ul className="articleList">
            {articleKeyword.map((article) => {
              const dateTime = new Date(article.createdAt).toLocaleString();

              return (
                <li key={article.id} data-id={article.id}>
                  <header>
                    <p>{article.Title}</p>
                    {
                      <time dateTime={dateTime}>
                        {new Date(article.createdAt).toLocaleString()}
                      </time>
                    }
                  </header>
                  <div>
                    <p>{article.alias}</p>
                    <img
                      src={`${process.env.REACT_APP_BACKEND}/${article.image}`}
                      alt={`Avatar de ${article.alias}`}
                    />
                  </div>
                  <div>
                    <p>{article.Description}</p>
                    <a href={`https://${article.url}`} target="blank">
                      {article.url}
                    </a>
                  </div>
                  {article.Rating_articles && <p>{article.Rating_articles}</p>}
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
};

export default ArticleKeyword;
