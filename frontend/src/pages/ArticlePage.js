import { useParams } from "react-router-dom";
import SingleArticle from "../components/SingleArticle/SingleArticle";

const ArticlePage = () => {
  const params = useParams();

  return (
    <section>
      <SingleArticle idArticle={params.idArticle} />
    </section>
  );
};

export default ArticlePage;
