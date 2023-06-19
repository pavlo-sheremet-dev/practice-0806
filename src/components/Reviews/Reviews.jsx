import Loader from 'components/Loader/Loader';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from 'services/api';

const Reviews = () => {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    const fetch = async () => {
      try {
        setIsLoading(true);
        const data = await fetchReviews(movieId);

        setReviews(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [movieId]);
  return (
    <>
      {isLoading && <Loader />}
      <ul>
        {reviews.map(({ id, name, content }) => (
          <li key={id}>
            <p>{name}</p>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Reviews;
