// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBTpSDc31AFrubvfXShFjJtsmuo5xfQsuI",
  authDomain: "jdot-f2762.firebaseapp.com",
  projectId: "jdot-f2762",
  storageBucket: "jdot-f2762.firebasestorage.app",
  messagingSenderId: "678335167986",
  appId: "1:678335167986:web:37d22dee353f352b89bf6b",
  measurementId: "G-0PTV0SY022"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;

