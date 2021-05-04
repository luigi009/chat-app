import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDNpM7mfnoLInWmCrYxRStCOi1F8hQ1XCk",
    authDomain: "chat-app-7224d.firebaseapp.com",
    projectId: "chat-app-7224d",
    storageBucket: "chat-app-7224d.appspot.com",
    messagingSenderId: "655135156486",
    appId: "1:655135156486:web:1005cd4530a872a3359687",
    measurementId: "G-SDYKGEB6Z6"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };