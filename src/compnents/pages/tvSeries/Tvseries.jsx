import React from "react";
import MovieCont from "../../movieContainer/MovieCont";
import { useState, useEffect } from "react";
import "./Tvseries.css";
import { Link } from "react-router-dom";
import Loader from "../../loader/Loader";
import NetworkErr from "../../networkError/NetworkErr";
function Tvseries() {
  const [tv, setTv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err,setErr] = useState(false)


  const apiAddress = `https://api.themoviedb.org/3/discover/tv?api_key=78393d09e7d06dc8a1d807120b3c221e`;

  const fetchMovie = async function (url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false)
      setTv(data.results);
    } catch (err) {
      console.log(err);
      setErr(true)
    }
  };
  useEffect(() => {
    fetchMovie(apiAddress);
  }, []);
  if(loading){
    return (<Loader/>)
  }
  if(err){
    return <NetworkErr/>
  }
  return (
    <div>
      <div className="movie-tv">
        {tv.map((arr) => (
          <Link to={`b/${arr.id}`} key={arr.id}>
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
