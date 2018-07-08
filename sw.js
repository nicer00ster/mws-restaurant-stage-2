importScripts('/cache-polyfill.js');

// Install ServiceWorker
self.addEventListener('install', event => {
 event.waitUntil(
   caches.open('restaurant').then((cache) => {
     return cache.addAll([
       // '/',
      '/index.html',
      '/restaurant.html',
      '/js/idb.js',
      '/js/dbhelper.js',
      '/js/main.js',
      '/js/restaurant_info.js',
      '/css/styles.css',
      '/img/1.webp',
      '/img/2.webp',
      '/img/3.webp',
      '/img/4.webp',
      '/img/5.webp',
      '/img/6.webp',
      '/img/7.webp',
      '/img/8.webp',
      '/img/9.webp',
      '/img/10.webp',
      '/maps/*';
     ]);
   })
 );
});

// Fetch resources
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if(response) {
        return response;
      }
      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((response) => {
        if(!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        var responseToCache = response.clone();

        caches.open('restaurant').then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      })
    })
  )
});

// Whitelist to reduce loadtime
self.addEventListener('activate', event => {
  var cacheWhiteList = ['restaurant'];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if(cacheWhiteList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      )
    })
  )
})
