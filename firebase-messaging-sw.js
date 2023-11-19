importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyADFzYFDM3D6__WXHZ0RvwxzHspzFvEwmw",
  authDomain: "pemersatu-7b002.firebaseapp.com",
  projectId: "pemersatu-7b002",
  storageBucket: "pemersatu-7b002.appspot.com",
  messagingSenderId: "867511991001",
  appId: "1:867511991001:web:bcff279318ec224859dcc8",
  measurementId: "G-QCED8REGCD"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
