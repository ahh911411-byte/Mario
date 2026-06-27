const CACHE_NAME = 'mario-infinite-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'audio/sounds/here_we_go.wav',
  'audio/sounds/coin.mp3',
  'audio/sounds/goomba_stomp.mp3',
  'audio/sounds/level_complete.mp3',
  'audio/sounds/death.mp3',
  'audio/sounds/main_theme.mp3'
];

// Dateien in den Speicher laden
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Dateien offline bereitstellen
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
