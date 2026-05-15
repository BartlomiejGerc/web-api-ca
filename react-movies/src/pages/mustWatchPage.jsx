import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import PageTemplate from "../components/templateMovieListPage";

const MustWatchPage = () => {
  const { mustWatch } = useContext(MoviesContext);


  const movies = mustWatch.map((id) => ({
    id: id,
    title: "Saved Movie",
    vote_average: 0,
    release_date: "",
    genre_ids: [],
  }));

  return (
    <PageTemplate
      title="Must Watch Movies"
      movies={mustWatch}
    />
  );
};

export default MustWatchPage;