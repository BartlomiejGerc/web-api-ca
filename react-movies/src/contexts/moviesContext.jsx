import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./authContext";
import {getUser, addFavoriteToUser,removeFavoriteFromUser,
} from "../api/tmdb-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const authContext = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [mustWatch, setMustWatch] = useState([]);

  useEffect(() => {
  const loadFavorites = async () => {
    if (!authContext.isAuthenticated || !authContext.userName) {
      setFavorites([]);
      return;
    }

    const user = await getUser(authContext.userName);
    setFavorites(user.favorites || []);
  };

  loadFavorites();
}, [authContext.isAuthenticated, authContext.userName]);

 const addToFavorites = async (movie) => {
  if (!authContext.isAuthenticated || !authContext.userName) {
    return;
  }

  const result = await addFavoriteToUser(authContext.userName, movie.id);

  if (result.success) {
    setFavorites(result.favorites);
  }
};

  const removeFromFavorites = async (movie) => {
  if (!authContext.isAuthenticated || !authContext.userName) {
    return;
  }

  const result = await removeFavoriteFromUser(authContext.userName, movie.id);

  if (result.success) {
    setFavorites(result.favorites);
  }
};

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  const addToMustWatch = (movie) => {
    if (!mustWatch.find((m) => m.id === movie.id)) {
  const updated = [...mustWatch, movie];
  setMustWatch(updated);
      setMustWatch(updated);
      console.log("Must Watch:", updated);
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        mustWatch,
        addToMustWatch,
        myReviews,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;