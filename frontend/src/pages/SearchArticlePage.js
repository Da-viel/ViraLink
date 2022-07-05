import { useState } from "react";
import SearchArticlesForm from "../components/SearchArticlesForm/SearchArticlesForm";
import ArticlesSearch from "../components/SingleArticle/SingleArticle";

const SearchArticlePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  console.log("Inside SearchArticlePage");
  console.log(searchResults);
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
