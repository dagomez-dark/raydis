// =========================================================
// SERVICE WORKER - RAYDis v2.0 (Soporte 100% Offline)
// =========================================================
const CACHE_NAME = 'raydis-cache-v9';

const ARCHIVOS_BASE = [
    './',
    './index.html',
    './app.js',
    './manifest.json',
    './logo.png',
    'https://cdn.sheetjs.com/xlsx-0.20.0/package/dist/xlsx.full.min.js'
];

// 1. INSTALACIÓN: Guarda todos los archivos de la App y la librería Excel en el celular
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ARCHIVOS_BASE);
        })
    );
    self.skipWaiting();
});

// 2. ACTIVACIÓN: Limpia cachés de versiones viejas automáticamente
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// 3. INTERCEPTOR: Estrategia "Red primero, y si no hay datos, usa la memoria interna"
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((respuestaRed) => {
                // Si hay internet, actualiza la copia guardada en el celular y entrega el archivo
                const copia = respuestaRed.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, copia);
                });
                return respuestaRed;
            })
            .catch(() => {
                // Si NO HAY DATOS, busca el archivo en la memoria del celular (ignorando ?v=9 si es necesario)
                return caches.match(event.request, { ignoreSearch: true });
            })
    );
});
