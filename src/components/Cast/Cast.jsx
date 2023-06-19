import Loader from 'components/Loader/Loader';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchActors } from 'services/api';

const Cast = () => {
  const { movieId } = useParams();

  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    const fetch = async () => {
      try {
        setIsLoading(true);
        const data = await fetchActors(movieId);

        setActors(data);
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
        {actors.map(({ id, name, poster }) => (
          <li key={id}>
            <p>{name}</p>
            <img src={poster} alt={name} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Cast;
