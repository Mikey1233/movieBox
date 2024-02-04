import { React, useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db, googleProvider } from "../../../config/firebaseConfig";
import MovieBox from "../../movieBox/MovieBox";
import "./Bookmarks.css";
import empty from "../../../assets/empty.svg";
import signup from "../../../assets/signUp.svg";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import Loader from "../../loader/Loader";
import NetworkErr from "../../networkError/NetworkErr";

function Bookmarks({ isActive, setIsActive }) {
  const userIdToFetch = auth?.currentUser?.uid;
  const [err,setErr] = useState(false)
  const [data, setData] = useState([]);
  const [isempty, setIsempty] = useState(false);
  const [loading, setLoading] = useState(true);

  /////////////to manage the key props
  
  const fetchDataFromFireStore = async () => {
    try {
      const q = await query(
        collection(db, "moviesBookmarked"),
        where("userId", "==", userIdToFetch)
      );
      const querySnapshot = await getDocs(q);
      const fetchedData = await querySnapshot.docs.map((doc) => doc.data());
      setData(fetchedData);
      fetchedData.length === 0 ? setIsempty(true) : setIsempty(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setErr(true)
    }
  };
  const signUserIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err);
      setIsActive(false);
    }
  };
  useEffect(() => {
    fetchDataFromFireStore();
  }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //user is signed in
        fetchDataFromFireStore();
        setIsActive(true);
      } else {
        // User is signed out
        setIsActive(false);
        setLoading(false);
      }
    });
    return () => unsubscribe(); // Cleanup when component unmounts
  }, [isActive]);
 if(err){
  return <NetworkErr/>
 }
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="bookmark">
      <h1>Hello , {auth?.currentUser?.displayName.split(" ")[0]}</h1>
      <div className="bookmark-set">
        {isActive === false && (
          <div className="no-data-signIn">
            <div style={{ margin: "0 3rem" }}>
              <img src={signup} alt="empty-svg" />
              <p>signin to check the movies you've added</p>
              <span
                onClick={signUserIn}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Click here to sign-in
              </span>
            </div>
          </div>
        )}
        {isempty ? (
          <div className="no-data">
            <div style={{ margin: "0 3rem" }}>
              <img src={empty} alt="empty-svg" />
              <p>you bookmark is empty</p>
            </div>
          </div>
        ) : (
          data.map((elem) => (
            <Link
              to={`${
                elem.type === "movie" ? `movie/${elem.movieId}` : `tv/${elem.movieId}`
              }`}
              key={elem.movieId}
            >
              <MovieBox
                title={elem.title}
                year={elem.release_date}
                type={elem.type === "movie" ? "movie" : "tv"}
                image={elem.image_path}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Bookmarks;
