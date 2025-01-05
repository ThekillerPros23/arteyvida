// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfCTnmRmWq2ptPqoVz7qqfp4VlzgRZFsg",
  authDomain: "arteyvida-65baa.firebaseapp.com",
  projectId: "arteyvida-65baa",
  storageBucket: "arteyvida-65baa.firebasestorage.app",
  messagingSenderId: "337322246202",
  appId: "1:337322246202:web:789b4ead3dfefcab643503",
  measurementId: "G-P9MD78EBH8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const  auth = getAuth(app)