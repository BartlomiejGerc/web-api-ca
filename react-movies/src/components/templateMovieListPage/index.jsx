import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

  function MovieListPageTemplate({ movies, title, action, page, setPage, totalPages }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  
  const genreId = Number(genreFilter);

  const displayedMovies = movies
    .filter((m) =>
      m.title.toLowerCase().includes(nameFilter.toLowerCase())
    )
    .filter((m) => (genreId > 0 ? m.genre_ids.includes(genreId) : true));
    


  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>

      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          key="find"
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>

        <MovieList movies={displayedMovies} action={action} />
      </Grid>
      <Grid size={12} sx={{ display: "flex", justifyContent: "center", gap: 2, padding: "20px" }}>
  <Button
    variant="contained"
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    Previous
  </Button>

  <Button variant="outlined" disabled>
    Page {page} of {totalPages}
  </Button>

  <Button
    variant="contained"
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
  >
    Next
  </Button>
</Grid>
    </Grid>
    
  );
}

export default MovieListPageTemplate;