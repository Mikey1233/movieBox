import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./TvDet.css";
////firebase
import { db,auth } from "../../config/firebaseConfig";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { fetchfunc, checkUserData } from "../fetchfunc";
/////////popup animation component
import Popup from "../popup/Popup";


const TvDet = ({ bookmark, setBookmark }) => {
  const { id } = useParams();
  const [tvSeriesDetails, setTvSeriesDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const moviesRef = collection(db, "moviesBookmarked");
  ////////all states
  const [img, setImage] = useState(null);
  const [isBookmarked, setIsbookmarked] = useState(false);
  const [bookmarkData, setBookmarkData] = useState([]);
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
        setImage(tvSeriesDetails.poster_path);

      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTvSeriesDetails();
    fetchfunc(id, setBookmarkData, setIsbookmarked);
  }, [id]);
  const removeItemFromBookmark = async (code) => {
    await deleteDoc(doc(db, "moviesBookmarked", code));
    // const rexs = await doc(db, "moviesBookmarked", code);

    setIsbookmarked(false);
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="tv-det">
        <Popup
        message={"added successfully"}
        bookmark={bookmark}
        setBookmark={setBookmark}
      />
      <div className="tv-det-content">
      <p style={{color:'red'}}>
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
                checkUserData(id, setBookmark, setIsbookmarked,tvSeriesDetails)
              }
            >
              Add to Bookmarks
            </button>
          )}
          {/* <button type="button" className="btn home">
            Add to Bookmarks
          </button> */}
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
