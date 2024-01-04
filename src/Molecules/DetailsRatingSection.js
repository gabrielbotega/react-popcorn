import { useState } from "react";
import StarRating from "../Atoms/StarRating";
import { ButtonAdd } from "../Atoms/ButtonAdd";

export function DetailsRatingSection({
  selectedId,
  watched,
  year,
  title,
  poster,
  runtime,
  onAddWatched,
  imdbRating,
  onCloseMovie,
}) {
  const [userRating, setUserRating] = useState(0);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      year,
      title,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  return (
    <div className="rating">
      {watched.some((movie) => movie.imdbID === selectedId) ? (
        <p>
          You Rated This Movie 🌟{" "}
          {watched.find((movie) => movie.imdbID === selectedId).userRating}
        </p>
      ) : (
        <>
          <StarRating size={24} maxRating={10} onSetRating={setUserRating} />
          {userRating > 0 && <ButtonAdd handleAdd={handleAdd} />}
        </>
      )}
    </div>
  );
}
