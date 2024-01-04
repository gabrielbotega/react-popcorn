import { useEffect, useState } from "react";
import Loader from "./Atoms/Loader";
import { ErrorMessage } from "./Atoms/ErrorMessage";
import { NavBar } from "./Organism/NavBar";
import { Search } from "./Atoms/Search";
import { Numresults } from "./Atoms/Numresults";
import { Box } from "./Template/Box";
import { Main } from "./Template/Main";
import { MovieList } from "./Molecules/MovieList";
import { MovieDetails } from "./Organism/MovieDetails";
import { WatchedMovieList } from "./Molecules/WatchedMovieList";
import { WatchedSummary } from "./Organism/WatchedSummary";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// Important to include outsidfe the component scope because it does not
//depend on anything inside it. If it was declared inside the component
//itwould be recreated everytime the component re-renders - ineficient
export const KEY = process.env.REACT_APP_API_KEY;
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  /*
  since it's asynchronous, it's important to have a callback function.
  This fetching is introducing a side effect in the component Render Logic
  which shouldn't be allowed in this logic --- top level code.
  When I tryu to update the state, it runs indefinitely. That's why we
  must never do it.
  
  When the fetch occurs, the App will re-render, then the function will
  fire again and the fetch will occur again. Then the state will be updated
  and the re-render will fire. Therefore, it's an infinity loop.
  
  fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
  .then((res) => res.json())
  .then((data) => setMovies(data.Search));

  Now, we need the useEffect() hook, which is a safe space to save
  these side effects functions. However, the side effects registered in 
  useEffect() hooks will only be executed after certain renders, for example
  only after the initial render (which is what we want in this case)
  */

  /*
    useEffect(): we pass in a function (effect) and then the deppendency,
    which in the case of an empty array means that the effect we passed in
    will only run on mount, i.e. when the App component runs for the 
    first time.
  */

  /*
  We always need to assume that something can go wrong when dealing
  with data fetching or asynchronous data.
  1) users can loose their internet connection - in default the screen
  will stop to load, and it's hard to notice that you lost the connection.
  Therefore we need to display some error message;
  2) We connot find anything in the search (undefined).
  */

  /*
  useEffect(function () {
    console.log("After initial render"); // after browser painting
  }, []);

  useEffect(function () {
    console.log("After every render"); // after browser painting
  });

  useEffect(
    function () {
      console.log("D"); // after browser painting
    },
    [query]
  );

  console.log("During render");

  */

  useEffect(
    function () {
      const controller = new AbortController(); //Browser API

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with data fetching");

          const data = await res.json();

          if (data.Response === "False") throw new Error(data.Error);
          // console.log(data.Search);
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");

        return;
      }

      //whenever I lookup for some movie, I close (if
      //there is) an open one.
      handleCloseMovie();
      fetchMovies();

      //cleanup function
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  // console.log(watched);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <Numresults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              // need too add here because it's where I have the button to select the movie
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
