import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../../context/TokenContext";
import { useModal } from "../../context/ModalContext";

import "./NewArticle.css";

const NewArticle = () => {
  let navigate = useNavigate();
  const [token] = useToken();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [, setModal] = useModal();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/article`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, url }),
      });

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
    const successP = document.querySelector("p.Success");

    if (successP) {
      const t = setTimeout(() => {
        document.querySelector("p.Success").remove();
        return navigate("/articles");
      }, 3000);

      return () => clearTimeout(t);
    }
  });

  return (
    <div>
      <form className="NewArticle" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          name="description"
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="url">URL:</label>
        <input
          type="text"
          name="url"
          value={url || ""}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button className="ButtonBack" onClick={() => setModal(null)}>
          <Link to="/articles">Back</Link>
        </button>
        <button disabled={loading}>Submit</button>
      </form>
      {error && <p className="Error">{error}</p>}
      {message && <p className="Success">{message}</p>}
    </div>
  );
};

export default NewArticle;
