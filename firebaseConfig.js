import firebase from 'firebase/compat/app'; // use 'firebase/compat/app' instead of 'firebase/app' if you are using Firebase 9 with older import syntax
import 'firebase/compat/firestore'; // ensure Firestore is imported correctly


const firebaseConfig = {
    apiKey: "AIzaSyCsDdtLnn5m_mg0N8m9xXRxmbRlSCwE1u8",
    authDomain: "bookapp-42e23.firebaseapp.com",
    projectId: "bookapp-42e23",
    storageBucket: "bookapp-42e23.firebasestorage.app",
    messagingSenderId: "73132410773",
    appId: "1:73132410773:web:42359590a17ccc91fa589c",
    measurementId: "G-4353LBNH4L"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  export const db = firebase.firestore();