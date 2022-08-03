// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updatePassword,
    onAuthStateChanged
} from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
class Firebase {
    constructor() {
        initializeApp(firebaseConfig);
        this.auth = getAuth();
        // this.db = getDatabase(app);
        this.dbRef = ref(getDatabase())
    }
    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
        createUserWithEmailAndPassword(this.auth, email, password)

    doSignInWithEmailAndPassword = (email, password) =>
        signInWithEmailAndPassword(this.auth, email, password)

    doSignOut = () =>
        signOut(this.auth)

    doPasswordReset = email =>
        sendPasswordResetEmail(this.auth, email)

    doPasswordUpdate = newPassword =>
        updatePassword(this.auth.currentUser, newPassword)

    doOnAuthStateChanged = (getAuthState) =>
        onAuthStateChanged(this.auth, getAuthState);

    // *** User API ***

    user = uid => get(child(this.dbRef, `users/${uid}`));

    users = () => get(child(this.dbRef, 'users'))
}

export default Firebase;