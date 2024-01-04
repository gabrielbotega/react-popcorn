import { useEffect, useState } from "react";
import Loader from "../Atoms/Loader";
import { HeaderDetails } from "../Molecules/HeaderDetails";
import { DetailsRatingSection } from "../Molecules/DetailsRatingSection";
import { DetailsInfoSection } from "../Molecules/DetailsInfoSection";
import { KEY } from "../App";

export function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Everytime this compoent mounts, we want to load the details of the movie selected
  //Therefore, we could use an useEffect (everytime it mounts)
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Genre: genre,
    Director: director,
  } = movie;

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  //Want to change the title of the page. Since this is an interaction
  //outside the ReactApp, we need to create another useEffect.
  //Since the need is to display the title of the movie being detailed,
  //here is the perfect place to add this functionality.
  // Need to add the title in the dependency array because when it first mount
  //the title is still "undefined".
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      //Cleanup function is just a function that returns from effect.
      return function () {
        document.title = "usePopcorn";
        // console.log(`Cleanup effect for the movie ${title}`);
        /*Interesting here is that even after the unmount the application remembers
        the name of the movie.
        This is due to the Closure effect on JS: "A function will always remembers
        all the variables that were present by the time and place that the function
        was created. "
        In this case, the cleanup function was created by the time the effect was
        created here, therefore, it'll remember its variables (the title was defined)*/
      };
    },
    [title]
  );

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseMovie();
          // console.log("CLOSING");
        }
      }
      document.addEventListener("keydown", callback);

      return document.removeEventListener("keydown", callback);
    },
    [onCloseMovie]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <HeaderDetails
            onCloseMovie={onCloseMovie}
            poster={poster}
            title={title}
            released={released}
            runtime={runtime}
            genre={genre}
            imdbRating={imdbRating}
          />

          <section>
            <DetailsRatingSection
              selectedId={selectedId}
              watched={watched}
              year={year}
              title={title}
              poster={poster}
              runtime={runtime}
              imdbRating={imdbRating}
              onAddWatched={onAddWatched}
              onCloseMovie={onCloseMovie}
            />
            <DetailsInfoSection
              plot={plot}
              actors={actors}
              director={director}
            />
          </section>
        </>
      )}
    </div>
  );
}
