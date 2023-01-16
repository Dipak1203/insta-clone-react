import { initializeApp } from "@firebase/app";
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAKgtgIi4qLMLT-F-KUsADpGUgJRnL-458",
    authDomain: "instagram-ba5b5.firebaseapp.com",
    databaseURL: "https://instagram-ba5b5-default-rtdb.firebaseio.com",
    projectId: "instagram-ba5b5",
    storageBucket: "instagram-ba5b5.appspot.com",
    messagingSenderId: "1045245034740",
    appId: "1:1045245034740:web:68a22aeeccaf0de4d71ea1",
    measurementId: "G-L305BZFK5S",
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export {db,auth}