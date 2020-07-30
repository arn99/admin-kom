importScripts('https://www.gstatic.com/firebasejs/7.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.1/firebase-messaging.js');
firebase.initializeApp({
    apiKey: 'AIzaSyAYn0I4D2jKsj3cPoRcd6cAU2g4ErqhS2c',
    authDomain: 'flutterfoodapp-aa0df.firebaseapp.com',
    databaseURL: 'https://flutterfoodapp-aa0df.firebaseio.com',
    projectId: 'flutterfoodapp-aa0df',
    storageBucket: 'flutterfoodapp-aa0df.appspot.com',
    messagingSenderId: '526930543438',
    appId: '1:526930543438:web:d004fcbc2b133d3609941f',
    measurementId: 'G-72C7PHRELN'
    
  });

const messaging = firebase.messaging();