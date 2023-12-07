import React from "react";
import './movieHome.css'
import MovieCont from "../movieContainer/MovieCont";
function MovieHome({ header, section }) {
  return (
    <div className="movieBox-all-recommend">
      <h2>{header}</h2>
      <div className="movieBox-all-recommend__contents">
        {section.map((arr) => (
          <MovieCont
            title={arr.title || arr.name}
            year={
              arr.release_date?.slice(0, 4) || arr.first_air_date.slice(0, 4)
            }
            type={"movie"}
            image={`https://image.tmdb.org/t/p/w500/${arr.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieHome;
