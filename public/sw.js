const CACHE_NAME = 'mockrank-v1';
const STATIC_ASSETS = [
  '/',
  '/dashboard',
  '/login',
  '/manifest.json',
  '/mockrank-logo.svg',
  '/favicon.ico'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip Chrome extension requests
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  // Skip external APIs (Supabase, Google, etc.)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached version if available
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise, fetch from network
      return fetch(event.request).then((response) => {
        // Don't cache non-200 responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Add to cache
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => {
        // If offline and no cache, return a basic offline page
        if (event.request.destination === 'document') {
          return caches.match('/') || new Response('Offline - Please check your internet connection', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' }
          });
        }
      });
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync triggered');
    // Handle offline actions when back online
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Implement background sync logic here
  // e.g., sync offline interview data when back online
  console.log('Performing background sync...');
}

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from MockRank',
    icon: '/mockrank-logo.svg',
    badge: '/mockrank-logo.svg',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open App',
        icon: '/mockrank-logo.svg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/mockrank-logo.svg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('MockRank', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/dashboard')
    );
  }
});