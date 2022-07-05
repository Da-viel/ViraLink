import { useState } from 'react';
import SearchArticlesForm from '../components/SearchArticlesForm/SearchArticlesForm';
import ArticlesSearch from '../components/ArticlesSearch/ArticlesSearch';

const SearchArticlePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  console.log('Inside SearchArticlePage');

  return (
    <article>
      {console.log('1')}
      <SearchArticlesForm setSearchResults={setSearchResults} />
      {console.log('2')}
      {console.log(searchResults)}
      <ArticlesSearch articles={searchResults} />
      {console.log('3')}
    </article>
  );
};

export default SearchArticlePage;

/*

<ArticlesSearch articles={searchResults} />
*/
