import { React, useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../../config/firebaseConfig";
import MovieBox from "../../movieBox/MovieBox";
import "./Bookmarks.css"

function Bookmarks() {
  const [data, setData]= useState([])
  const userIdToFetch = auth?.currentUser?.uid;
  const fetchDataFromFireStore = async () => {
    try {
      const q = await query(
        collection(db, "moviesBookmarked"),
        where("userId", "==", userIdToFetch)
      );
      const querySnapshot = await getDocs(q);
      const fetchedData = await querySnapshot.docs.map(doc => doc.data());
      setData(fetchedData)
      console.log(fetchedData)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchDataFromFireStore();
  }, []);
  return (
    <div className="bookmark">
      <h1>Hello {auth?.currentUser?.displayName.split(" ")[0]}</h1>
      <div className="bookmark-set" >
        {data.map((elem) =>
        (
          
            <MovieBox
            title={elem.title}
            year={elem.release_date}
            type={"movie"}
            image={elem.image_path}
            key={elem.movieId}
          />
            
        )
          
        )}
      </div>
    </div>
  );
}

export default Bookmarks;
