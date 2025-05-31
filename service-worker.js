const CACHE_NAME = "farmalite-v1";
const urlsToCache = [
  "index.html",
  "general.html",
  "clinica.html",
  "manifest.json"
];

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
