// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgjQCqi_qK2C7np6pOHDTiSBXfqGZegXU",
  authDomain: "new-f5c0b.firebaseapp.com",
  projectId: "new-f5c0b",
  storageBucket: "new-f5c0b.appspot.com",
  messagingSenderId: "593118668237",
  appId: "1:593118668237:web:2ef4475e6b83f0f9e99084"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export {auth,storage,db};


