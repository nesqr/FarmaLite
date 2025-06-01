const CACHE_NAME = 'farmaLite-v1.7';
const urlsToCache = [
    '/',
    '/index.html',
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
    '/js/app.js',
    '/manifest.json',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierto:', CACHE_NAME);
                return cache.addAll(urlsToCache);
            })
            .catch(err => console.error('Error al abrir cache:', err))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Eliminando cache antiguo:', cache);
                        return caches.delete(cache);
                    }
                })
            );
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
                return fetch(event.request).then(networkResponse => {
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                        return networkResponse;
                    }
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    return networkResponse;
                });
            })
            .catch(err => {
                console.error('Error en fetch:', err);
                return caches.match('/index.html');
            })
    );
});