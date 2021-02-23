const CACHE_NAME = "chelseafc";
var urlsToCache = [
    "/",
    "/index.html",
    "/nav.html",
    "/pages/home.html",
    "/pages/head-coach.html",
    "/pages/history.html",
    "/pages/trophies.html",
    "/js/materialize/materialize.min.js",
    "/css/materialize.min.css",
    "/assets/head-coach.jpg",
    "/assets/history.jpg",
    "/assets/trophies.png",
    "/js/nav.js",
    "/assets/logo-192x192.png",
    "/assets/logo-256x256.png",
    "/assets/logo-384x384.png",
    "/assets/logo-512x512.png",
    "/manifest.json"
];
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});
self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request, {cacheName : CACHE_NAME})
        .then(function(response) {
            if(response){
                console.log("Service Worker: Gunakan aset cache dari ", response.url);
                return response;
            }
            console.log("Service Worker: Memuat aset dari server ", event.request.url);
            return fetch(event.request);
        })
    );
});
self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys()
        .then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker : chace "+ cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});