const CACHE_NAME = 'farmaLite-v1.9.2';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/js/app.js',
    '/general/res-general.html',
    '/general/vias-de-administracion.html',
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
                console.log('Cache abierto');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});