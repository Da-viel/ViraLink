import { useEffect, useState } from "react";
import { useToken } from "../../context/TokenContext";
import Article from "../Article/Article";
import { ErrorOrSucces } from "../ErrorOrSucces/ErrorOrSucces";

import "./Articles.css";

const Articles = ({ articles, setArticles }) => {
  const [token] = useToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mediante "useEffect" hacemos que la primera vez que se monta el componente se
  // cargue de forma automática la lista de articles.
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Vaciamos el error.
      setError(null);
      const params = token
        ? {
            method: "GET",
            headers: {
              Authorization: token,
            },
          }
        : {};

      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND}/article`,
          params
        );

        const body = await res.json();
        if (body.status === "error") setError(body.message);
        setArticles(body.data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);
  return (
    <>
      <main className="articleSearch">
        <ErrorOrSucces error={error} />
        {articles && (
          <ul className="articleList">
            {articles.map((article) => {
              return (
                <li key={article.id}>
                  <Article article={article} />
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
