```
const CACHE_NAME = 'farma-lite-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/app.js',
    '/general/resumenes-general.html',
    '/general/clasificacion-general.html',
    '/general/mnemotecnicos-general.html',
    '/general/autoevaluacion-general.html',
    '/general/notas-general.html',
    '/clinica/resumenes-clinica.html',
    '/clinica/clasificacion-clinica.html',
    '/clinica/mnemotecnicos-clinica.html',
    '/clinica/autoevaluacion-clinica.html',
    '/clinica/notas-clinica.html',
    '/idioma.html',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
```