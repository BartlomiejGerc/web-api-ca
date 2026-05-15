import React from "react";
import Grid from "@mui/material/Grid";
import MovieCard from "../movieCard";

const MovieList = ({ movies, action }) => {
  return (
  <>
  
    {movies.length === 0 ? (
      <h2 style={{ margin: "2rem" }}>No movies found</h2>
    ) : (
      movies.map((m) => (
        <Grid
          key={m.id}
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <MovieCard movie={m} action={action} />
        </Grid>
      ))
    )}
  </>
);
}

export default MovieList;