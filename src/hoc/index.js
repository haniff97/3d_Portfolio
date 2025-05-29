import SectionWrapper from "./SectionWrapper";

export { SectionWrapper };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeCzIN3WpAQw7gU44gZxpayHXgujWk4eg",
  authDomain: "haniff-portfolio-de804.firebaseapp.com",
  projectId: "haniff-portfolio-de804",
  storageBucket: "haniff-portfolio-de804.firebasestorage.app",
  messagingSenderId: "46462729402",
  appId: "1:46462729402:web:337a6013b0e75f65ff5683",
  measurementId: "G-J5EPBZHDJ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log("app");