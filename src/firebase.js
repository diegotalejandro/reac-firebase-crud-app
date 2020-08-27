import firebase from 'firebase/app'
import "firebase/analytics"
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAlK1MBF8dC9FRL5qHHRPAbHMIFn-GgO44",
  authDomain: "aseguramiento-de-calidad.firebaseapp.com",
  databaseURL: "https://aseguramiento-de-calidad.firebaseio.com",
  projectId: "aseguramiento-de-calidad",
  storageBucket: "aseguramiento-de-calidad.appspot.com",
  messagingSenderId: "220027386272",
  appId: "1:220027386272:web:039b56be9db96673a48cc5",
  measurementId: "G-LGG31SHV4B",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = fb.firestore();


