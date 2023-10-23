import { initializeApp } from "firebase/app";
import { getFirestore , collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAzOM_08gS8WtwM_nxcNNDLkNIMrure9s8",
  authDomain: "devconnect-2.firebaseapp.com",
  projectId: "devconnect-2",
  storageBucket: "devconnect-2.appspot.com",
  messagingSenderId: "627909312007",
  appId: "1:627909312007:web:e5f68dec713fd2e586f4a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export const userRef = collection(db,"users")
export const ProfileRef = collection(db,"profile")
export const EducationRef = collection(db,"Education")
export const ExperienceRef = collection(db,"Experience")
export const postRef = collection(db,"posts")
export const CommentRef = collection(db,"comments")