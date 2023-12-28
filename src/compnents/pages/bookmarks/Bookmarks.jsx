import { React, useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db, googleProvider } from "../../../config/firebaseConfig";
import MovieBox from "../../movieBox/MovieBox";
import "./Bookmarks.css";
import empty from "../../../assets/empty.svg";
import signup from "../../../assets/signUp.svg";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";

function Bookmarks({ isActive, setIsActive }) {
  const [data, setData] = useState([]);
  const [isempty, setIsempty] = useState(false); 
  const fetchDataFromFireStore = async () => {
    try {
      const q = await query(
        collection(db, "moviesBookmarked"),
        where("userId", "==", userIdToFetch)
      );
      const querySnapshot = await getDocs(q);
      const fetchedData = await querySnapshot.docs.map((doc) => doc.data());
      setData(fetchedData);
      console.log(fetchedData);
      fetchedData.length === 0 ? setIsempty(true) : setIsempty(false);
    } catch (err) {
      console.log(err);
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
  const userIdToFetch = auth?.currentUser?.uid;
  useEffect(() => {
 
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //user is signed in
        fetchDataFromFireStore()
        setIsActive(true);
      } else {
        // User is signed out
        setIsActive(false);
      }
    });
    return () => unsubscribe(); // Cleanup when component unmounts
  }, [isActive]);
  return (
    <div className="bookmark">
      <h1>Hello {auth?.currentUser?.displayName.split(" ")[0]}</h1>
      <div className="bookmark-set">
        {isActive === false && (
          <div className="no-data-signIn">
            <div>
              <img src={signup} alt="empty-svg" />
              <p>signup to check the movies you've added</p>
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
            <div>
              <img src={empty} alt="empty-svg" />
              <p>you bookmark is empty</p>
            </div>
          </div>
        ) : (
          data.map((elem) => (
            <MovieBox
              title={elem.title}
              year={elem.release_date}
              type={"movie"}
              image={elem.image_path}
              key={elem.movieId}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Bookmarks;
