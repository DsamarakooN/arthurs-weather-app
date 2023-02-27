import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyAdf7AYxmBVmHxuJQIh_1l-zq0ME6Guzmg",
    authDomain: "weatherappfirebase-d6f53.firebaseapp.com",
    projectId: "weatherappfirebase-d6f53",
    storageBucket: "weatherappfirebase-d6f53.appspot.com",
    messagingSenderId: "971688025306",
    appId: "1:971688025306:web:31674cb3c158d7978819e3",
    measurementId: "G-PT6FBPGVPL"
};

const app = initializeApp(firebaseConfig);

export default app;