/**
 * Created by sergio on 10-02-2017.
 */

importScripts('cache-polyfill.js');

var CACHE_IT = 'test-cache-v1';
var urlsToCache = [ '/' ,
  '/index.html',
  '/bower_components/bootstrap/dist/css/bootstrap.min.css',
  '/bower_components/jquery/dist/jquery.min.js',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
  '/assets/icons/FUNCHAL_logo2016-03.png',
  '/favicon.ico',
  '/inline.bundle.js',
  '/polyfills.bundle.js',
  '/styles.bundle.js',
  '/vendor.bundle.js',
  '/main.bundle.js'
];

self.addEventListener('install',function(event){
  event.waitUntil(
    caches.open(CACHE_IT)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );

});



self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
