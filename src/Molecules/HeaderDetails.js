export function HeaderDetails({
  onCloseMovie,
  poster,
  title,
  released,
  genre,
  imdbRating,
  runtime,
}) {
  return (
    <header>
      <button className="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>
      <img src={poster} alt={`Poster of the ${title} movie`} />
      <div className="details-overview">
        <h2>{title}</h2>
        <p>
          {released} &bull; {runtime}
        </p>
        <p>{genre}</p>
        <p>
          <span>🌟</span>
          {imdbRating} IMDb Rating
        </p>
      </div>
    </header>
  );
}
