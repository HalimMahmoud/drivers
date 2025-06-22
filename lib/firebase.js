import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
// const config ={
// 	apiKey: process.env.FIREBASE_API_KEY,
// 	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
// 	databaseURL: process.env.FIREBASE_DATABASE_URL,
// 	projectId: process.env.FIREBASE_PROJECT_ID,
// 	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
// };

const config = {
  apiKey: "AIzaSyDVtnlFupipvG1tobAqidfIb43SQyG6yS4",
  authDomain: "drivers-f9210.firebaseapp.com",
  databaseURL: "https://drivers-f9210.firebaseio.com",
  projectId: "drivers-f9210",
  storageBucket: "drivers-f9210.appspot.com",
  messagingSenderId: "70164274527",
  appId: "1:70164274527:web:92ee926f77a25f4f56aaea",
  measurementId: "G-N2KZLL1M70"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.firestore();

const settings = {
  /* your settings... */
  /* timestampsInSnapshots: true */
};
db.settings(settings);

export { firebase, auth, db };
