import { useParams } from "react-router-dom";
import ArticlesSearch from "../components/SingleArticle/SingleArticle";

const SearchArticlePage = () => {
  const params = useParams();

  return (
    <section>
      <ArticlesSearch keyword={params.keyword} />
    </section>
  );
};

export default SearchArticlePage;
