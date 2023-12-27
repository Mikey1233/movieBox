import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Details.css";
import checked from "../../assets/checked.svg";
//////firebase
import { db, auth } from "../../config/firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  query,
  where,
  doc,
  getDocs,
} from "firebase/firestore";
import { fetchfunc } from "./fetchfunc";

function Details({ bookmark, setBookmark }) {
// const moviesRef = collection(db, "moviesBookmarked");

  const moviesRef = collection(db, "moviesBookmarked");
  const userIdToFetch = auth?.currentUser?.uid;

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
    fetchfunc();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const addBookmark = async () => {
    try {
      await addDoc(moviesRef, {
        image_path: movieDetails.poster_path,
        release_date: movieDetails.release_date,
        title: movieDetails.title,
        type: "movie",
        userId: auth?.currentUser?.uid,
        movieId: id,
      });
      setBookmark(true);
    } catch (err) {
      console.log(err);
    }
  };
  
  const removeItemFromBookmark = async (code) => {
    await deleteDoc(doc(db, "moviesBookmarked", code));
    console.log("deleted", code);
  };
  return (
    <div className="movie-details">
      <div className={bookmark ? "success" : "success hide"}>
        <img src={checked} alt="checknox" />
        added to bookmarks
      </div>
      <div
        className="movie-details-img"
        // style={{background: true ?`url(https://image.tmdb.org/t/p/w500${movieDetails.poster_path})`:''}}
      >
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
        </div>
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
          {/* {movieDetails.genres.length > 1 && movieDetails.genres.map((genre) => genre.name).join(", ")} */}
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
            <button type="button" className="btn home" onClick={addBookmark}>
              Add to Bookmarks
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
