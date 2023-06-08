const MovieInfo = ({ movieDetails }) => {
  const { poster, year, genresList, vote, title, overview } = movieDetails;
  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <img src={poster} alt={title} />
      <div>
        <h2>
          {title} ({year})
        </h2>
        <p>User Score: {vote}%</p>
        <p>Overview</p>
        <p>{overview}</p>
        <p>Genres:</p>
        <p>{genresList}</p>
      </div>
    </div>
  );
};

export default MovieInfo;
