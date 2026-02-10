/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'smart-edu-v1';
const STATIC_CACHE = 'smart-edu-static-v1';
const API_CACHE = 'smart-edu-api-v1';

// Static assets to pre-cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
];

// API routes we want to cache for offline use
const CACHEABLE_API_ROUTES = [
  '/api/courses',
  '/api/materials',
  '/api/progress',
  '/api/revisions',
  '/api/gamification'
];

// Install — pre-cache shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== API_CACHE && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch — Network-first for API, Cache-first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // API requests — network-first, fall back to cache
  if (url.pathname.startsWith('/api/')) {
    const isCacheable = CACHEABLE_API_ROUTES.some((route) =>
      url.pathname.startsWith(route)
    );

    if (isCacheable) {
      event.respondWith(
        fetch(request)
          .then((response) => {
            // Clone and cache successful responses
            if (response.ok) {
              const cloned = response.clone();
              caches.open(API_CACHE).then((cache) => cache.put(request, cloned));
            }
            return response;
          })
          .catch(() => {
            // Offline — serve from cache
            return caches.match(request).then((cached) => {
              if (cached) return cached;
              return new Response(
                JSON.stringify({ offline: true, message: 'You are offline. Showing cached data.' }),
                { headers: { 'Content-Type': 'application/json' } }
              );
            });
          })
      );
      return;
    }
  }

  // Static assets — cache-first
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          // Cache static assets (JS, CSS, images)
          if (
            response.ok &&
            (url.pathname.endsWith('.js') ||
              url.pathname.endsWith('.css') ||
              url.pathname.endsWith('.png') ||
              url.pathname.endsWith('.svg') ||
              url.pathname.endsWith('.ico') ||
              url.pathname.endsWith('.woff2') ||
              url.pathname.endsWith('.woff'))
          ) {
            const cloned = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, cloned));
          }
          return response;
        })
        .catch(() => {
          // For navigation requests, return the cached index.html (SPA fallback)
          if (request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return new Response('Offline', { status: 503 });
        });
    })
  );
});

// Listen for messages from the app (e.g., force-cache specific content)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_URLS') {
    const urls = event.data.urls || [];
    event.waitUntil(
      caches.open(API_CACHE).then((cache) =>
        Promise.all(
          urls.map((url) =>
            fetch(url, { headers: { Authorization: event.data.token ? `Bearer ${event.data.token}` : '' } })
              .then((res) => {
                if (res.ok) cache.put(url, res);
              })
              .catch(() => {})
          )
        )
      )
    );
  }

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
