import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../../context/TokenContext";
import { useModal } from "../../context/ModalContext";
import Navigation from "../Navigation/Navigation";
import RatingArticles from "../RatingArticles/RatingArticles";
import DeleteArticle from "../DeleteArticle/DeleteArticle";

import "./ArticlesSearch.css";

const ArticlesSearch = () => {
  let navigate = useNavigate();
  const [token] = useToken();
  const [keyword, setKeyword] = useState("");
  const [, setModal] = useModal();
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState(null);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(null);

  const getArticlesByKeyword = async () => {
    setLoading(true);

    // Vaciamos el error.
    setError(null);

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

      if (body.status === "error") {
        setArticles(null);
        setError(body.message);
        console.log(error);
      } else {
        setArticles(body.data.articles);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * #######################
   * ## Get Articles Form ##
   * #######################
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    getArticlesByKeyword();
  };

  // Mediante "useEffect" hacemos que la primera vez que se monta el componente se
  // cargue de forma automática la lista de articles.
  /* useEffect(() => {
    getArticlesByKeyword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);*/

  return (
    <>
      <main className="ArticlesSearch">
        <Navigation />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="keyword"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button disabled={loading}>Search</button>
        </form>
        {error && <p className="Error">{error}</p>}
        {articles && (
          <ul className="articleList">
            {articles.map((article) => {
              const dateTime = new Date(article.createdAt).toLocaleString(
                "es-ES"
              );
              return (
                <li key={article.id} data-id={article.id}>
                  <div className="container border">
                    <div className="row border">
                      <div className="col-6 border">
                        <Link
                          className="tosinglepost"
                          onClick={() => setModal(null)}
                          to={`/article/${article.id}`}
                        >
                          <h3>{article.Title}</h3>
                        </Link>
                      </div>
                      <div className="col-6 border">
                        {
                          <time dateTime={dateTime}>
                            {new Date(article.createdAt).toLocaleString(
                              "es-ES"
                            )}
                          </time>
                        }
                      </div>
                    </div>
                    <div className="row border">
                      <div className="col-3 border">
                        <img
                          className="avatarimg"
                          src={`${process.env.REACT_APP_BACKEND}/${article.image}`}
                          alt={`Avatar de ${article.alias}`}
                        />
                        <p className="username">{article.alias}</p>
                      </div>
                      <div className="col-9 border">
                        <p>{article.Description}</p>
                      </div>
                    </div>
                    <div className="row border">
                      <div className="col-2 border">
                        <DeleteArticle idArticle={article.id} />
                      </div>
                      <div className="col-8 border">
                        <a href={`https://${article.url}`} target="blank">
                          {article.url}
                        </a>
                      </div>
                      <div className="col-2 border">
                        {article.Rating_articles && (
                          <div className="rating">
                            <p>Avg. rating: {article.Rating_articles}</p>
                          </div>
                        )}
                        <RatingArticles />
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

export default ArticlesSearch;
