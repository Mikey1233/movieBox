import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Details.css";
//////firebase
import { db, auth } from "../../config/firebaseConfig";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { fetchfunc, checkUserData } from "../fetchfunc";
/////////popup animation component
import Popup from "../popup/Popup";

function Details({ bookmark, setBookmark }) {
  //////took the state as parameters from app.js to manage the popup animation when movie is bookmarked
  // const moviesRef = collection(db, "moviesBookmarked");

  const moviesRef = collection(db, "moviesBookmarked");
  // const userIdToFetch = auth?.currentUser?.uid;

  const { id } = useParams();
  ///all states
  const [movieDetails, setMovieDetails] = useState([]);
  const [img, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsbookmarked] = useState(false);
  const [bookmarkData, setBookmarkData] = useState([]);

  ////fetching single data for the page from firestore
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${"78393d09e7d06dc8a1d807120b3c221e"}`
        );
        const data = await response.json();
        setMovieDetails(data);
        setLoading(false);
        setImage(movieDetails.poster_path);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchMovieDetails();
    fetchfunc(id, setBookmarkData, setIsbookmarked);
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const removeItemFromBookmark = async (code) => {
    await deleteDoc(doc(db, "moviesBookmarked", code));
    // const rexs = await doc(db, "moviesBookmarked", code);

    setIsbookmarked(false);
  };
  return (
    <div className="movie-details">
      <Popup
        message={"added successfully"}
        bookmark={bookmark}
        setBookmark={setBookmark}
      />
      <div className="movie-details-content">
        <p style={{color:'red'}}>
        {movieDetails.genres.length > 1
          ? movieDetails?.genres.map((genre) => genre.name).join(", ")
          : ""}
        </p>
        

        <h1>{movieDetails.title}</h1>
        <p>{movieDetails.overview}</p>
        <p>
          <span className="color-text">Release date : </span>{" "}
          {movieDetails.release_date}
        </p>

        <div>
          <Link to={-1}>
            <button type="button" className="btn home">
              Back
            </button>
          </Link>
          {isBookmarked ? (
            <button
              type="button"
              className="btn home"
              onClick={() => removeItemFromBookmark(bookmarkData[0]?.id)}
            >
              remove from Bookmarks
            </button>
          ) : (
            <button
              type="button"
              className="btn home"
              onClick={() =>
                checkUserData(id, setBookmark, setIsbookmarked, movieDetails)
              }
            >
              Add to Bookmarks
            </button>
          )}
        </div>
      </div>
      <div className="movie-details-img">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
        </div>
      </div>
    </div>
  );
}

export default Details;
