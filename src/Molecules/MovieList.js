import { Movie } from "../Atoms/Movie";

export function MovieList({ movies, onSelectedMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          onSelectedMovie={onSelectedMovie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}
