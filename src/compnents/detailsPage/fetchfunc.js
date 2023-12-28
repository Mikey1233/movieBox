// import { addDoc } from "firebase/firestore";
import { where,query,getDocs,collection,addDoc } from "firebase/firestore";
import { db,auth } from "../../config/firebaseConfig";

/////////////////this func retrieve a single movie from the firetore database and checks if such movie is already in the bookmark
export const fetchfunc = async (id,setBookmarkData,setIsbookmarked) => {
    const single = await query(
      collection(db, "moviesBookmarked"),
      where("movieId", "==", id)
    );
    const singleSnapshot = await getDocs(single);
    const fetchedSingleData = await singleSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
   console.log(fetchedSingleData)
    setBookmarkData(fetchedSingleData);
    ////////////checking if data is already in the bookmark
    if (fetchedSingleData[0] === undefined) {
      setIsbookmarked(false);
    } else {
      setIsbookmarked(true);
    }
  };

//////this function checks wether a movie is already store in the database,if not it the mive can be stored
 export const checkUserData = async (pageId,setBookmark,setIsbookmarked,movieDetails) => {
  const collectionRef = collection(db, 'moviesBookmarked');
    const q = await query(collectionRef, where('movieId', '==', pageId));
  
 await   getDocs(q)
      .then((querySnapshot) =>  {
        if (querySnapshot.size > 0) {
          console.log('User data found!');
        } else {
          // console.log('User data not found.');
        addDoc(collectionRef, {
            image_path: movieDetails.poster_path,
            release_date: movieDetails.release_date,
            title: movieDetails.title,
            type: "movie",
            userId: auth?.currentUser?.uid,
            movieId: pageId,
          });
          setBookmark(true);
          setIsbookmarked(true)
        }
      })
      .catch((error) => {
        console.error('Error checking user data:', error);
      });
  }
  
