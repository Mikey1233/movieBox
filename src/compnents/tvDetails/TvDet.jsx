import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./TvDet.css";

const TvDet = () => {
  const { id } = useParams();
  const [tvSeriesDetails, setTvSeriesDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTvSeriesDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${"78393d09e7d06dc8a1d807120b3c221e"}`
        );
        const data = await response.json();
        setTvSeriesDetails(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTvSeriesDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="tv-det">
      <div className="tv-det-content">
      <p style={{color:'red'}}>
          {/* <span className="color-text">Genres : </span>{" "} */}
          {tvSeriesDetails.genres.map((genre) => genre.name).join(", ")}
        </p>
        <h1>{tvSeriesDetails.name}</h1>
        <p>
          {tvSeriesDetails.overview}
        </p>
        <p>
          <span>First air date : </span>{" "}
          {tvSeriesDetails.first_air_date}
        </p>
        <p>
          <span >Number of seasons : </span>
          {tvSeriesDetails.number_of_seasons}
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
      <div className="tv-det-img">
        <img
          src={`https://image.tmdb.org/t/p/w500${tvSeriesDetails.poster_path}`}
          alt={tvSeriesDetails.name}
        />
      </div>
    </div>
  );
};

export default TvDet;
