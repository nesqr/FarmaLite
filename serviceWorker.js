const CACHE_NAME = 'farmalite-cache-v1.9.2';
const urlsToCache = [
  '/',
  '/index.html',
  '/js/app.js',
  '/manifest.json',
  '/idioma.html',
  '/generalidades/res-general.html',
  '/generalidades/vias-de-administracion.html',
  '/generalidades/procesos-farmacocineticos.html',
  '/generalidades/clasificacion-general.html',
  '/generalidades/mnemotecnicos-general.html',
  '/generalidades/autoevaluacion-general.html',
  '/generalidades/notas-general.html',
  '/clinica/resumenes-clinica.html',
  '/clinica/clasificacion-clinica.html',
  '/clinica/mnemotecnicos-clinica.html',
  '/clinica/autoevaluacion-clinica.html',
  '/clinica/notas-clinica.html',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  'https://polyfill.io/v3/polyfill.min.js?features=es6',
  'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto: ' + CACHE_NAME);
        return cache.addAll(urlsToCache).catch(err => {
          console.error('Error al cachear recursos:', err);
        });
      })
      .then(() => {
        console.log('Service Worker instalado');
        return self.skipWaiting();
      })
      .catch(err => console.error('Error en instalación:', err))
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
    .then(() => {
      console.log('Service Worker activado');
      return self.clients.claim();
    })
    .catch(err => console.error('Error en activación:', err))
  );
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // Ignorar solicitudes no relevantes (ej. chrome-extension)
  if (requestUrl.protocol === 'chrome-extension:') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Cache hit:', event.request.url);
          return response;
        }

        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(networkResponse => {
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
                console.log('Cache actualizado:', event.request.url);
              })
              .catch(err => console.error('Error al actualizar cache:', err));

            return networkResponse;
          })
          .catch(err => {
            console.error('Error en fetch:', err);
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html')
                .then(fallback => fallback || new Response(
                  '<h1>Offline</h1><p>Conéctate a internet para acceder a FarmaLite.</p>',
                  { headers: { 'Content-Type': 'text/html' } }
                ));
            }
            throw err;
          });
      })
      .catch(err => {
        console.error('Error en cache match:', err);
        return new Response('Error interno', { status: 500 });
      })
  );
});