import { useEffect, useState } from "react";
import { useToken } from "../../context/TokenContext";
import { useUser } from "../../context/UserContext";
import Navigation from "../Navigation/Navigation";
import DeleteArticle from "../DeleteArticle/DeleteArticle";
import RatingArticles from "../RatingArticles/RatingArticles";

import "./SingleArticle.css";

const SingleArticle = ({ idArticle }) => {
  const [token] = useToken();
  const [user] = useUser();
  const [loading, setLoading] = useState(false);
  const [articleById, setArticleById] = useState(null);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(null);

  const getArticleById = async () => {
    setLoading(true);

    // Vaciamos el error.
    setError(null);

    // Si hay token nos interesa mandarlo para comprobar los articles de los que somos dueños.

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/article/${idArticle}/single`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );

      const body = await res.json();

      if (body.status === "error") setError(body.message);

      setArticleById(body.data.article);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Mediante "useEffect" hacemos que la primera vez que se monta el componente se
  // cargue de forma automática la lista de articles.
  useEffect(() => {
    getArticleById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  return (
    <>
      <main className="ArticleById">
        <Navigation />
        {error && <p className="Error">{error}</p>}

        {articleById && (
          <ul className="articleList">
            {articleById.map((article) => {
              const dateTime = new Date(article.createdAt).toLocaleString(
                "es-ES"
              );
              return (
                <li key={article.id}>
                  <div className="container shadow p-3 pt-2 mb-5 bg-body rounded">
                    <div className="row border-bottom  mb-1">
                      <div className="col-6 d-flex justify-content-center align-items-center">
                        <h4>{article.Title}</h4>
                      </div>
                      <div className="col-6 mb-1 d-flex justify-content-center align-items-center">
                        {
                          <time dateTime={dateTime}>
                            {new Date(article.createdAt).toLocaleString(
                              "es-ES"
                            )}
                          </time>
                        }
                      </div>
                    </div>
                    <div className="row pb-1 ">
                      <div className="col-4 ">
                        <img
                          className="avatarimg  mt-2"
                          src={`${process.env.REACT_APP_BACKEND}/${article.image}`}
                          alt={`Avatar de ${article.alias}`}
                        />
                        <p className="username">{article.alias}</p>
                      </div>
                      <div className="auxiliar col-8 rounded d-flex justify-content-center align-items-center ">
                        <p>{article.Description}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="auxurl col-12 mb-1 bg-info mt-1 rounded d-flex justify-content-center align-items-center ">
                        <a
                          className="rounded"
                          href={`${article.url}`}
                          target="blank"
                        >
                          {article.url}
                        </a>
                      </div>
                    </div>
                    <div className="row ">
                      {token && article.alias === user && (
                        <div className="col-6 border d-flex justify-content-center align-items-center">
                          <DeleteArticle idArticle={article.id} />
                        </div>
                      )}

                      <div className="col-6 border d-flex justify-content-center align-items-center">
                        {token && article.Rating_articles && (
                          <div className="rating">
                            <p>Avg. rating: {article.Rating_articles}</p>
                          </div>
                        )}
                        <RatingArticles idArticle={article.id} />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
};

export default SingleArticle;
