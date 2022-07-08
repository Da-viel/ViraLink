import { useState } from "react";
import { useToken } from "../../context/TokenContext";
import { ErrorOrSucces } from "../ErrorOrSucces/ErrorOrSucces";
const SearchArticlesForm = ({ setSearchResults }) => {
  const [token] = useToken();
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
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
        setSearchResults([]);
        setError(body.message);
      } else {
        setSearchResults(body.data.articles);
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
    try {
      getArticlesByKeyword();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <div className="SearchArticlesForm">
        <div
          className="
                container border shadow p-3 mb-5 bg-body rounded"
        >
          <form onSubmit={handleSubmit}>
            <h3>Enter the keywords for searching:</h3>
            <input
              className="col-12 form-control p-2"
              type="search"
              name="search"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="btn btn-primary mt-2" disabled={loading}>
              Submit
            </button>
          </form>
        </div>
      </div>
      <ErrorOrSucces error={error} />
    </>
  );
};

export default SearchArticlesForm;
