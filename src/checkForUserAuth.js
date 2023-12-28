import { useEffect } from 'react';
import { auth } from './config/firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import img from "./assets/image-avatar.svg";

//this function checks whether a user i logged-in so it can change it profile pic
export function checkingAuthUser(userPic,setUserpic){
  const acctPic = auth?.currentUser?.photoURL;
  
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            //user is signed in
            setUserpic(acctPic)
          } else {
            // User is signed out
            setUserpic(img)
          }
        });
        
          return () => unsubscribe(); // Cleanup when component unmounts
        }, [userPic]);
}