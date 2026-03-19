importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDBn2tCaiVgQ6EYk46nNB6ntxPboUpKXOg",
  authDomain: "thecrunch-cc3ec.firebaseapp.com",
  projectId: "thecrunch-cc3ec",
  storageBucket: "thecrunch-cc3ec.firebasestorage.app",
  messagingSenderId: "427450207497",
  appId: "1:427450207497:web:1134a30fb54c87535b17d8"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || "New Order Alert! 🔔";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new order to process.",
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    requireInteraction: true,
    data: { url: self.location.origin + '/admin/orders' }
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});