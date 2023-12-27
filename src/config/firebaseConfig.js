import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore,query} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDxzNZxdaLYkbnLyS_xlUreVfdou7Y3M-o",
  authDomain: "moviesite-a9253.firebaseapp.com",
  projectId: "moviesite-a9253",
  storageBucket: "moviesite-a9253.appspot.com",
  messagingSenderId: "699180012360",
  appId: "1:699180012360:web:8021fdbf343f791200197d",
  measurementId: "G-7VL0LZ5JC4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)