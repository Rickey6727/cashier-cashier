import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB8-6Fa3rbE8fg0OU7wjSeJtTXjesuV7lU",
    authDomain: "cashier-cashier.firebaseapp.com",
    databaseURL: "https://cashier-cashier.firebaseio.com",
    projectId: "cashier-cashier",
    storageBucket: "cashier-cashier.appspot.com",
    messagingSenderId: "920382987281",
    appId: "1:920382987281:web:f12c4f38cf63ba3008a5b0"
};
firebase.initializeApp(firebaseConfig);
  
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
