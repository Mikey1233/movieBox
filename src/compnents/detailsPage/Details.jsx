import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Details.css";
function Details() {
  const { id } = useParams();

  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${"78393d09e7d06dc8a1d807120b3c221e"}`
        );
      //  const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${"78393d09e7d06dc8a1d807120b3c221e"}`)
        const data = await response.json();
        setMovieDetails(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="movie-details">
      <div className="movie-details-img">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
        />
      </div>

      <div className="movie-details-content">
        <h1>{movieDetails.title}</h1>
        <p>
          <span className="color-text">About : </span> <br />
          {movieDetails.overview}
        </p>
        <p>
          <span className="color-text">Release date : </span>{" "}
          {movieDetails.release_date}
        </p>
        <p>
          <span className="color-text">Genres : </span>{" "}
          {movieDetails.genres.map((genre) => genre.name).join(", ")}
        </p>
        <div>
          <Link to={-1}>
            <button type="button" className="btn home">
              Back
            </button>
          </Link>
          <button type="button" className="btn home">
            Add to Bookmarks
          </button>
        </div>
      </div>
    </div>
  );
}

export default Details;
