import { useState, useEffect } from "react";
import { useToken } from "../../context/TokenContext";
import { ErrorOrSucces } from "../ErrorOrSucces/ErrorOrSucces";

import "./RatingArticles.css";

const RatingArticles = ({ idArticle }) => {
  const [token] = useToken();
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/article/${idArticle}/rating`,
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ rating: parseInt(rating) }),
        }
      );

      const body = await res.json();

      if (body.status === "error") {
        setError(body.message);
      } else {
        setMessage(body.message);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const successP = document.querySelector("p.success");
    const errorP = document.querySelector("p.error");

    if (successP) {
      const t = setTimeout(() => {
        document.querySelector("p.success").remove();
      }, 3000);

      return () => clearTimeout(t);
    }
    if (errorP) {
      const t = setTimeout(() => {
        document.querySelector("p.error").remove();
      }, 3000);

      return () => clearTimeout(t);
    }
  });

  return (
    <div className="container rounded bg-info offset-0 mb-2 mt-1 pt-1">
      <div className="RatingForm">
        <form onSubmit={handleSubmit}>
          <select
            name="DEFAULT"
            className="form-select mt-1"
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="DEFAULT" selected disabled>
              Your rating
            </option>
            <option value="5">5 - The highest rating</option>
            <option value="4">4 - High rating</option>
            <option value="3">3 - Indifferent</option>
            <option value="2">2 - Low rating </option>
            <option value="1">1 - The lowest rating</option>
          </select>
          <button className="btn btn-primary mt-2 mb-2" disabled={loading}>
            Submit
          </button>
        </form>
        <ErrorOrSucces error={error} message={message} />
      </div>
    </div>
  );
};

export default RatingArticles;
