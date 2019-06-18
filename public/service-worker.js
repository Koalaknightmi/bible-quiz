importScripts('/lib/dexie.js');
importScripts('/lib/serviceWorkerWare.js');
// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v5';
const DATA_CACHE_NAME = 'data-cache-v1';
const DATA_POSTS = 'post-catch-v1';
// CODELAB: Update cache names any time any of the cached files change.
const FILES_TO_CACHE = [
  '/',
  '/html/index.html',
  '/gettext',
  '/html/offline.html',
  '/html/scripture-portion.html',
  '/html/typequizzing.html',
  '/html/leaderboard.html',
  '/css/style.css',
  '/css/scriptureport.css',
  '/css/typing-quizzing.css',
  '/css/leaderboard.css',
  '/js/scriptureportion.js',
  '/js/typequiz.js',
  '/js/login.js',
  '/js/leaderboard.js',
  '/images/NBQO logo.jpg',
  '/images/loading.gif',
  '/images/android-chrome-192x192.png',
  '/images/favicon.ico',
  '/images/favicon-16x16.png',
  '/images/favicon-32x32.png',
  '/libraries/dexie.js',
  'https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2Fimage%20(4).png?v=1560030827542',
  'https://cdn.jsdelivr.net/npm/@cheapundies/responsive-voice@1.5.7/index.js',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Gnome-searchtool.svg/14px-G-searchtool.svg.png'
];

var root = (function() {
  var tokens = (self.location + '').split('/');
  tokens[tokens.length - 1] = '';
  return tokens.join('/');
})();

var worker = new ServiceWorkerWare();

worker.get(root + 'api/quotations?*', tryOrFallback(new Response(
  JSON.stringify([{
    text: 'You are offline and I know it well.',
    author: 'The Service Worker Cookbook',
    id: 1,
    isSticky: true
  }]),
  { headers: { 'Content-Type': 'application/json' } }
)));

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // CODELAB: Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE)
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
var callsToCache = [];
self.addEventListener('fetch', function (evt) {
  console.log('[Service Worker] Fetch (url)', evt);
  if(evt.request.method === "POST"){
		
	}
  //console.log(evt.request.url);
  if (evt.request.url.includes('/leaderboardfetch')) {
  console.log('[Service Worker] Fetch (data)', evt.request.url);
  evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
            .then((response) => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
              return response;
            }).catch((err) => {
              // Network request failed, try to get it from the cache.
              return cache.match(evt.request)
                      .catch(() => {
                  return caches.open(CACHE_NAME)
                      .then((cache) => {
                        return cache.match('html/offline.html');
                      });
                });
            });
      }));
  return;
}
  if (evt.request.url.includes('/user/')) {
  console.log('[Service Worker] Fetch (data)', evt.request.url);
  evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
            .then((response) => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
              return response;
            }).catch((err) => {
              return cache.match(evt.request)
            });
      }));
  return;
}
  evt.respondWith(
    fetch(evt.request)
        .catch(() => {
          return caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request)
          .then((response) => {
            return response || fetch(evt.request);
          })
        
    })
        })
  );
});

self.addEventListener('push', function (event) {
  console.log(event.data)
  const payload = event.data ? event.data.text() : 'no payload';
  const options = {
    body: payload,
    icon: "/images/NBQO logo.jpg",
    /*image: "https://cdn.glitch.com/project-avatar/cfc340a0-db08-47ab-ae0f-2f9aacd8294c.png?1559424076873",*/
    badge: "https://cdn.glitch.com/eb5b036c-82b3-497e-9d05-ce2a5a9d85e1%2Fimage%20(4).png?v=1560030827542",
    vibrate: [100, 100, 100, 200, 300, 100, 100, 100],
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
    self.registration.showNotification('bible quizzing', options)
  );
});
self.addEventListener('notificationclick', function (event) {
  console.log(event)
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
        console.log(windowClients)
        for (let i = 0; i < windowClients.length; i++) {
          const windowClient = windowClients[i];
          if (windowClient.url === urlToOpen) {
            matchingClient = windowClient;
            matchingClient.postMessage({
              message: 'Received a push message.',
              time: new Date().toString()
            });
            break;
          }
        }
        
        if (matchingClient) {
          event.notification.close();
          return matchingClient.focus();
        } else {
          event.notification.close();
          //return clients.openWindow(urlToOpen);
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

self.addEventListener('message', event => {
  console.log(event.data.msg, event.data.url);
});
