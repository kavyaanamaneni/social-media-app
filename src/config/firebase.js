import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAFpqbDow4aEj6tVS3mJFVZwInpp8ukfqI",
  authDomain: "social-media-app-817fc.firebaseapp.com",
  projectId: "social-media-app-817fc",
  storageBucket: "social-media-app-817fc.appspot.com",
  messagingSenderId: "960079280531",
  appId: "1:960079280531:web:230338a6c08c9d2a015066"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const  auth=getAuth(app)
export const  provider=new GoogleAuthProvider();
export const db=getFirestore(app);