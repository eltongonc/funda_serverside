// Simple example
var CACHE_NAME_CORE = 'funda-v1-core';
var CACHE_NAME_PAGES = 'funda-v1-pages';
var urlsToCache = [
    '/img/logo.svg',
    '/offline/',
    '/css/style.min.css',
    '/js/script.js'
];


self.addEventListener('install', event => event.waitUntil(
    caches.open(CACHE_NAME_CORE)
        .then(cache => {console.log('Opened cache'); return cache.addAll(urlsToCache)})
        .then(self.skipWaiting())
        .catch(function(err) {console.error(err);})

));


self.addEventListener('fetch', function(event) {
    const request = event.request;
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then(response => cachePage(request, response))
                .catch(err => getCachedPage(request))
                .catch(err => fetchCoreFile('/offline/'))
        );
    } else {
        event.respondWith(
            fetch(request)
                .catch(err => fetchCoreFile(request.url))
                .catch(err => fetchCoreFile('/offline/'))
        );
    }
});

function cachePage(request, response) {
    const clonedResponse = response.clone();
    caches.open(CACHE_NAME_PAGES)
    .then(cache => cache.put(request, clonedResponse));
    return response;

}
function fetchCoreFile(url) {
    return caches.open(CACHE_NAME_CORE)
        .then(cache => cache.match(url))
        .then(response => response ? response : Promise.reject());
}

function getCachedPage(request) {
    return caches.open(CACHE_NAME_PAGES)
        .then(cache => cache.match(request))
        .then(response => response ? response : Promise.reject());
}
