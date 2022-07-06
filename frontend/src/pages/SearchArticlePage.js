import { useState, useEffect } from "react";
import SearchArticlesForm from "../components/SearchArticlesForm/SearchArticlesForm";
import ArticlesSearch from "../components/ArticlesSearch/ArticlesSearch";

const SearchArticlePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const li = document.querySelector("li");

    if (li) {
      document.querySelector("li").remove();
    }
  }, [setSearchResults]);

  return (
    <article>
      <SearchArticlesForm setSearchResults={setSearchResults} />

      <ArticlesSearch articles={searchResults} />
    </article>
  );
};

export default SearchArticlePage;

/*

<ArticlesSearch articles={searchResults} />
*/
