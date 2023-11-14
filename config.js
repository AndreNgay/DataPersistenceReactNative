

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBl1Q3cc7pEWReWr3-koFY1NgB8T0nc1B4",
    authDomain: "fir-datapersistence.firebaseapp.com",
    projectId: "fir-datapersistence",
    storageBucket: "fir-datapersistence.appspot.com",
    messagingSenderId: "617558864850",
    appId: "1:617558864850:web:d507139060cb4700d58e0b",
    measurementId: "G-Y6VRDFW6RV"
};

if(!firebase.apps.length > 0) {
    firebase.initializeApp(firebaseConfig);
}

export {firebase};