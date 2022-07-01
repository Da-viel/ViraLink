import { useEffect, useState } from "react";
import { useToken } from "../../context/TokenContext";
import Navigation from "../Navigation/Navigation";
import RatingArticles from "../RatingArticles/RatingArticles";

import "./Articles.css";

const Articles = () => {
  const [token, setToken] = useToken();
  const [loading, setLoading] = useState(false);
  const [articles, setarticles] = useState(null);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(null);
  const getArticles = async () => {
    setLoading(true);
    // Vaciamos el error.
    setError(null);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/article`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const body = await res.json();
      console.log(body.data);
      if (body.status === "error") setError(body.message);
      setarticles(body.data.articles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // Mediante "useEffect" hacemos que la primera vez que se monta el componente se
  // cargue de forma automática la lista de articles.
  useEffect(() => {
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);
  return (
    <>
      <main className="articleSearch">
        <Navigation />
        {error && <p className="Error">{error}</p>}
        {articles && (
          <ul className="articleList">
            {articles.map((article) => {
              const dateTime = new Date(article.createdAt).toLocaleString(
                "es-ES"
              );
              return (
                <li key={article.id} data-id={article.id}>
                  <header>
                    <h3>{article.Title}</h3>
                    {
                      <time dateTime={dateTime}>
                        {new Date(article.createdAt).toLocaleString("es-ES")}
                      </time>
                    }
                  </header>
                  <div className="avatar_description">
                    <div className="user">
                      <img
                        src={`${process.env.REACT_APP_BACKEND}/${article.image}`}
                        alt={`Avatar de ${article.alias}`}
                      />
                      <p>{article.alias}</p>
                    </div>
                    <div className="description">
                      <p>{article.Description}</p>
                    </div>
                  </div>
                  <div className="url">
                    <a href={`https://${article.url}`} target="blank">
                      {article.url}
                    </a>
                  </div>
                  <div className="footerArticles">
                    <footer>
                      {article.Rating_articles && (
                        <div className="rating">
                          <p>Rating:{article.Rating_articles}</p>
                        </div>
                      )}
                      <div className="delete">
                        <button>:wastebasket:</button>
                      </div>
                      <RatingArticles />
                    </footer>
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
export default Articles;
