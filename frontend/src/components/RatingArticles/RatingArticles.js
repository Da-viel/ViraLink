import "./RatingArticles.css";

const RatingArticles = () => {
  return (
    <select name="ratings" id="ratings">
      <option selected disabled>
        Your rating
      </option>
      <option value={1}>1 - The lowest rating</option>
      <option value={2}>2 - Low rating</option>
      <option value={3}>3 - Indifferent</option>
      <option value={4}>4 - High rating</option>
      <option value={5}>5 - The highest rating</option>
    </select>
  );
};

export default RatingArticles;
