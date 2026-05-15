import React from "react";
import { useQuery } from "@tanstack/react-query";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";

const UpcomingMoviesPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcomingMovies,
  });

  const { addToMustWatch } = useContext(MoviesContext);
  
  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  const toWatchAction = (movie) => {
  return (
    <IconButton
      aria-label="add to must watch"
      onClick={(e) => {
        e.preventDefault();
        addToMustWatch(movie);
      }}
    >
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={toWatchAction}
    />
  );
};

export default UpcomingMoviesPage;