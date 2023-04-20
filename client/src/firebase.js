// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use

import { getAuth, GoogleAuthProvider } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGPlEs_whC7hH0RqPVskUMZMC_f7H6DYc",
  authDomain: "scholarly-368012.firebaseapp.com",
  projectId: "scholarly-368012",
  storageBucket: "scholarly-368012.appspot.com",
  messagingSenderId: "664093608172",
  appId: "1:664093608172:web:1b39774b023559b3bcfdc9",
  measurementId: "G-4JJBFLBG0L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);

export default app;
