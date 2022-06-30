import { useParams } from "react-router-dom";
import ArticleKeyword from "../components/ArticleKeyword/ArticleKeyword";

const ArticlePage = () => {
  const params = useParams();
  console.log(params);
  return (
    <section>
      <ArticleKeyword keyword={params} />
    </section>
  );
};

export default ArticlePage;
