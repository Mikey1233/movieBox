import { addDoc } from "firebase/firestore";

export const fetchfunc = async () => {
    const single = await query(
      collection(db, "moviesBookmarked"),
      where("movieId", "==", id)
    );
    const singleSnapshot = await getDocs(single);
    const fetchedSingleData = await singleSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
   
    setBookmarkData(fetchedSingleData);
    if (fetchedSingleData[0] === undefined) {
      setIsbookmarked(false);
    } else {
      setIsbookmarked(true);
    }
  };

  
