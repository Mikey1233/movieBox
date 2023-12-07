import React from "react";
import { useState, useEffect } from "react";
import "./Movies.css";
import MovieCont from "../../movieContainer/MovieCont";
function Movies() {
  const [movie, setMovies] = useState([]);
  const apiAddress = `https://api.themoviedb.org/3/discover/movie?api_key=78393d09e7d06dc8a1d807120b3c221e`;
  const fetchMovie = async function (url) {
    const response = await fetch(url);
    const data = await response.json();
    setMovies(data.results);
  };
  useEffect(() => {
    fetchMovie(apiAddress);
  }, []);
  return (
    <div>
      <h1>Movies</h1>
      <div className="movie-content">
        {movie.map((arr) => (
          <MovieCont
            title={arr.title || arr.name}
            year={
              arr.release_date?.slice(0, 4) || arr.first_air_date.slice(0, 4)
            }
            type={"movie"}
            image={arr.poster_path}
          />
        ))}
      </div>
    </div>
  );
}

export default Movies;
