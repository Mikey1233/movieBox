import React from "react";
import { useState, useEffect } from "react";
import "./Movies.css";
import MovieCont from "../../movieContainer/MovieCont";
import { Link } from "react-router-dom";
import Loader from "../../loader/Loader";
import NetworkErr from "../../networkError/NetworkErr";
function Movies() {
  const [movie, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err,setErr] = useState(false)


  const apiAddress = `https://api.themoviedb.org/3/discover/movie?api_key=78393d09e7d06dc8a1d807120b3c221e`;
  const fetchMovie = async function (url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
      setLoading(false)
      console.log(movie)
    } catch (err) {
      console.log(err);
      setErr(true)
    }
  };
  useEffect(() => {
    fetchMovie(apiAddress);
  }, []);
  if(loading){
    return (
      <Loader/>
    )
  }
  if(err){
    return <NetworkErr/>
  }
  return (
    <div>
      <div className="movie-content">
        {movie.map((arr) => (
          <Link to={`a/${arr.id}`} key={arr.id}>
            <MovieCont
              title={arr.title || arr.name}
              year={
                arr.release_date?.slice(0, 4) || arr.first_air_date.slice(0, 4)
              }
              type={"movie"}
              image={arr.poster_path}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Movies;
