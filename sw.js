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
      '/img/1.jpg',
      '/img/2.jpg',
      '/img/3.jpg',
      '/img/4.jpg',
      '/img/5.jpg',
      '/img/6.jpg',
      '/img/7.jpg',
      '/img/8.jpg',
      '/img/9.jpg',
      '/img/10.jpg'
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
