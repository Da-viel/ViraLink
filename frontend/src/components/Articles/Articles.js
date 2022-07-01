import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useToken } from "../../context/TokenContext";
import Navigation from "../Navigation/Navigation";
import Accordion from "../Accordion/Accordion";
import EditUser from "../EditUser/EditUser";
import { useModal } from "../../context/ModalContext";

import "./Articles.css";
import { NavLink } from "react-router-dom";

const Articles = () => {
  const [token, setToken] = useToken();
  const [loading, setLoading] = useState(false);
  const [articles, setarticles] = useState(null);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(null);
  const [, setModal] = useModal();

  const getArticles = async () => {
    setLoading(true);

    // Vaciamos el error.
    setError(null);

    // Si hay token nos interesa mandarlo para comprobar los articles de los que somos dueños.

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

        <Accordion>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setToken(null);
              <Navigate to="/login" />;
            }}
          >
            Log Out
          </button>
          <button onClick={() => setModal(<EditUser />)}>Edit Profile</button>
        </Accordion>

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
                    <p>{article.Title}</p>
                    {
                      <time dateTime={dateTime}>
                        {new Date(article.createdAt).toLocaleString("es-ES")}
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

export default Articles;
