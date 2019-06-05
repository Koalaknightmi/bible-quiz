// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';
// CODELAB: Update cache names any time any of the cached files change.
const FILES_TO_CACHE = [
  '/',
  '/html/index.html',
  '/gettext',
  '/html/offline.html',
  '/html/scripture-portion.html',
  '/html/typequizzing.html',
  '/css/style.css',
  '/css/scriptureport.css',
  '/js/scriptureportion.js',
  '/js/typequiz.js',
  '/js/login.js',
  '/js/pages.js',
  '/images/NBQO logo.jpg',
  '/images/loading.gif',
  '/images/android-chrome-192x192.png',
  '/images/favicon.ico',
  '/images/favicon-16x16.png',
  '/images/favicon-32x32.png'
];
self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // CODELAB: Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
})
self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }))
    })
  );
  self.clients.claim();
});

  self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });


self.addEventListener('push', function(event) { 
  console.log(event.data)
  const payload = event.data ? event.data.text() : 'no payload';
  const options = {
      body: payload,
      icon: "/images/NBQO logo.jpg",
      /*image: "https://cdn.glitch.com/project-avatar/cfc340a0-db08-47ab-ae0f-2f9aacd8294c.png?1559424076873",*/
      badge: "/images/NBQO logo.jpg",
      vibrate: [100,100,100,200,300,100,100,100],
      sound: "https://cdn.glitch.com/cfc340a0-db08-47ab-ae0f-2f9aacd8294c%2Fnotif.mp3",
     /* actions: [
        {
          action: 'coffee-action',
          title: 'Coffee',
          icon: 'https://cdn.glitch.com/project-avatar/cfc340a0-db08-47ab-ae0f-2f9aacd8294c.png?1559424076873'
        },
        {
          action: 'doughnut-action',
          title: 'Doughnut',
          icon: 'https://cdn.glitch.com/project-avatar/cfc340a0-db08-47ab-ae0f-2f9aacd8294c.png?1559424076873'
        }
      ],*/
    tag: 'biblenotif'
    };
    
  event.waitUntil(
    self.registration.showNotification('bible quizzing',options)
  );
});
self.addEventListener('notificationclick', function(event) {
  if (!event.action) {
    // Was a normal notification click
    console.log('Notification Click.');
      const urlToOpen = new URL("/", self.location.origin).href;

  const promiseChain = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  })
  .then((windowClients) => {
    let matchingClient = null;

    for (let i = 0; i < windowClients.length; i++) {
      const windowClient = windowClients[i];
      if (windowClient.url === urlToOpen) {
        matchingClient = windowClient;
        break;
      }
    }

    if (matchingClient) {
      event.notification.close();
      return matchingClient.focus();
    } else {
      event.notification.close();
      return clients.openWindow(urlToOpen);
    }
  });

  event.waitUntil(promiseChain);
    return;
  }

  switch (event.action) {
    case 'coffee-action':
      console.log('User ❤️️\'s coffee.');
      break;
    case 'doughnut-action':
      console.log('User ❤️️\'s doughnuts.');
      break;
    default:
      console.log(`Unknown action clicked: '${event.action}'`);
      break;
  }
   
  
  event.notification.close();
});