import { useState } from "react";
import SearchArticlesForm from "../components/SearchArticlesForm/SearchArticlesForm";
import ArticlesSearch from "../components/ArticlesSearch/ArticlesSearch";

const SearchArticlePage = () => {
  const [searchResults, setSearchResults] = useState([]);

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
