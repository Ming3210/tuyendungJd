// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5pa5F0PW9UaEXWuhJSJUXT-GQyriUIcg",
  authDomain: "ptit-k5-5b7cb.firebaseapp.com",
  projectId: "ptit-k5-5b7cb",
  storageBucket: "ptit-k5-5b7cb.appspot.com",
  messagingSenderId: "656651980127",
  appId: "1:656651980127:web:33976e4ca0583b5fb7baea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
