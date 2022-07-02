import './RatingArticles.css';

const RatingArticles = () => {
  return (
    <select defaultValue={'DEFAULT'}>
      <option value='DEFAULT' disabled>
        Rating
      </option>
      <option value='1'>1</option>
      <option value='2'>2</option>
      <option value='3'>3</option>
      <option value='4'>4</option>
      <option value='5'>5</option>
    </select>
  );
};

export default RatingArticles;
