import Articles from '../components/Articles/Articles';

const HomePage = ({ articles, setArticles }) => {
  return (
    <section>
      <Articles articles={articles} setArticles={setArticles} />
    </section>
  );
};

export default HomePage;
