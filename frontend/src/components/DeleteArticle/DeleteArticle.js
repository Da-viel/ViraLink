import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../context/TokenContext";
import { ErrorOrSucces } from "../ErrorOrSucces/ErrorOrSucces";

import "./DeleteArticle.css";

const DeleteArticle = (idArticle) => {
  let navigate = useNavigate();
  const [token] = useToken();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [update, setUpdate] = useState(false);

  const handleDeleteArticle = async ({ idArticle }) => {
    setLoading(true);
    setError(null);

    if (window.confirm("¿Do you wat to delete this article?")) {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND}/article/${idArticle}`,
          {
            method: "DELETE",
            headers: {
              Authorization: token,
            },
          }
        );

        const body = await res.json();

        if (body.status === "error") {
          setError(body.message);
        } else {
          setUpdate(!update);
          setMessage(body.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const successP = document.querySelector("p.success");

    if (successP) {
      const t = setTimeout(() => {
        document.querySelector("p.success").remove();
        navigate("/articles");
      }, 3000);

      return () => clearTimeout(t);
    }
  });

  return (
    <div className="container">
      {token && (
        <button
          className="col-12 btn btn-danger"
          onClick={() => handleDeleteArticle(idArticle)}
        >
          Borrar
        </button>
      )}
      <ErrorOrSucces error={error} message={message} />
    </div>
  );
};

export default DeleteArticle;
