import Loader from 'components/Loader/Loader';
import MoviesList from 'components/MoviesList/MoviesList';
import { useEffect, useState } from 'react';

import { fetchTrending } from 'services/api';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTrending();
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <>
      <section>
        <div>
          <h1>Trending Movies</h1>
          {isLoading && <Loader />}
          <MoviesList movies={movies} />
        </div>
      </section>
    </>
  );
};

export default Home;
