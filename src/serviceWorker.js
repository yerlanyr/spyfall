const serviceWorkerVersion = '1.0.4';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(serviceWorkerVersion).then(cache => {
            return cache.addAll([
                '/android-icon-144x144.png',
                '/android-icon-192x192.png',
                '/android-icon-36x36.png',
                '/android-icon-48x48.png',
                '/android-icon-72x72.png',
                '/android-icon-96x96.png',
                '/apple-icon-114x114.png',
                '/apple-icon-120x120.png',
                '/apple-icon-144x144.png',
                '/apple-icon-152x152.png',
                '/apple-icon-180x180.png',
                '/apple-icon-57x57.png',
                '/apple-icon-60x60.png',
                '/apple-icon-72x72.png',
                '/apple-icon-76x76.png',
                '/apple-icon-precomposed.png',
                '/apple-icon.png',
                '/browserconfig.xml',
                '/favicon-16x16.png',
                '/favicon-32x32.png',
                '/favicon-96x96.png',
                '/favicon.ico',
                '/index.html',
                '/manifest.json',
                '/ms-icon-144x144.png',
                '/ms-icon-150x150.png',
                '/ms-icon-310x310.png',
                '/ms-icon-70x70.png',
                '/icon_512x512.png'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open(serviceWorkerVersion).then(cache => {
            return cache.match(event.request);
        }).then((matching) => {
            return matching || fetch(event.request);
        })
    );
});

self.addEventListener('activate', event => {
    var cacheKeeplist = [serviceWorkerVersion];

    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if(cacheKeeplist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});