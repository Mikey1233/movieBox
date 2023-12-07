import React from "react";
import MovieCont from "../../movieContainer/MovieCont";
import { useState, useEffect } from "react";
import "./Tvseries.css";
import { Link } from "react-router-dom";
function Tvseries() {
  const [tv, setTv] = useState([]);
  const apiAddress = `https://api.themoviedb.org/3/discover/tv?api_key=78393d09e7d06dc8a1d807120b3c221e`;

  const fetchMovie = async function (url) {
    const response = await fetch(url);
    const data = await response.json();
    setTv(data.results);
  };
  useEffect(() => {
    fetchMovie(apiAddress);
  }, []);
  return (
    <div>
      <div className="movie-tv">
        {tv.map((arr) => (
          <Link to={`${arr.id}`} key={arr.id}>
            <MovieCont
              title={arr.title || arr.name}
              year={
                arr.release_date?.slice(0, 4) || arr.first_air_date.slice(0, 4)
              }
              type={"tv"}
              image={arr.poster_path}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Tvseries;
