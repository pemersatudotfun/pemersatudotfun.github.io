// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

var config = {
	 apiKey: "AIzaSyADFzYFDM3D6__WXHZ0RvwxzHspzFvEwmw",
    authDomain: "pemersatu-7b002.firebaseapp.com",
    projectId: "pemersatu-7b002",
    storageBucket: "pemersatu-7b002.appspot.com",
    messagingSenderId: "867511991001",
    appId: "1:867511991001:web:bcff279318ec224859dcc8",
    measurementId: "G-QCED8REGCD",
    messagingSenderId: '867511991001',



};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  // console.log('[firebase-messaging-sw.js] Received background message ', payload);
  if(payload.data.private=="true") return;
  const notificationTitle = payload.data.title;
  const notificationOptions = {
          body: payload.data.content,
          icon: payload.data.icon,
          data: payload.data
  };

  var notification =  self.registration.showNotification(notificationTitle,
      notificationOptions);
  // console.log(notification);
  return notification;
});
//

self.addEventListener('notificationclick', function(event) {
  // console.log(event);
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data.url));

  

});
