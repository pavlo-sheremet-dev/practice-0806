import Loader from 'components/Loader/Loader';
import MovieInfo from 'components/MovieInfo/MovieInfo';
import { Suspense, useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { fetchMovieDetails, getPoster } from 'services/api';

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();

  const backLinkHref = useRef(location.state?.from ?? '/');

  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    const fetch = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieDetails(movieId);

        const { title, overview, release_date, vote_average, genres } = data;

        const poster = getPoster(data.poster_path);
        const year = new Date(release_date).getFullYear();
        const genresList =
          genres.map(genre => genre.name).join(', ') || 'No info';
        const vote = Math.round(vote_average * 10);

        setMovieDetails({ poster, year, genresList, vote, title, overview });
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [movieId]);

  return (
    <>
      <section>
        <div>
          <h1>Movie Details</h1>
          {isLoading && <Loader />}
          <Link to={backLinkHref.current}>GO BACK</Link>
          {movieDetails && <MovieInfo movieDetails={movieDetails} />}
          <nav>
            <NavLink to="cast">Cast</NavLink>
            <NavLink to="reviews">Reviews</NavLink>
          </nav>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default MovieDetails;
