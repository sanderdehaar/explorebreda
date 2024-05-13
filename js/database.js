// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCUyQJ4KqnBfGJN7V2TRx7ZE5iz1t8qZG4",
    authDomain: "login-2aed6.firebaseapp.com",
    databaseURL: "https://login-2aed6-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "login-2aed6",
    storageBucket: "login-2aed6.appspot.com",
    messagingSenderId: "162746718196",
    appId: "1:162746718196:web:923f4f47ef891a30a14ba1",
    measurementId: "G-GVP2FJVHSL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize variables
const auth = firebase.auth()
const database = firebase.database()