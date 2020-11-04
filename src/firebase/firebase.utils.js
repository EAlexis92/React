import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDiukZ8CXAD3lSAsrBqm0BK6YDaCmv34bA",
    authDomain: "react-a6dfc.firebaseapp.com",
    databaseURL: "https://react-a6dfc.firebaseio.com",
    projectId: "react-a6dfc",
    storageBucket: "react-a6dfc.appspot.com",
    messagingSenderId: "893567391226",
    appId: "1:893567391226:web:9471404dda585fc6c68043",
    measurementId: "G-WP5LY5CCLJ"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    console.log(userRef);

    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;