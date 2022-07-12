import Articles from "../components/Articles/Articles";

const HomePage = ({ articles, setArticles }) => {
  return (
    <header>
      <Articles articles={articles} setArticles={setArticles} />
    </header>
  );
};

export default HomePage;
