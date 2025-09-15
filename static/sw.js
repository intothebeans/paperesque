const CACHE_NAME = "paperesque-v1";
const STATIC_CACHE_URLS = [
    "/",
    "/css/styles.css",
    "/js/main.js",
    "/js/ui-components.js",
    "/js/animations.js",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => cache.addAll(STATIC_CACHE_URLS))
            .then(() => self.skipWaiting()),
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            return caches.delete(cacheName);
                        }
                    }),
                );
            })
            .then(() => self.clients.claim()),
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;

    if (!event.request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        caches.match(event.request).then((response) => {
            return (
                response ||
                fetch(event.request).then((fetchResponse) => {
                    if (fetchResponse.ok) {
                        const responseUrl = new URL(fetchResponse.url);
                        if (
                            responseUrl.pathname.match(
                                /\.(css|js|png|jpg|jpeg|gif|webp|svg|ico)$/i,
                            )
                        ) {
                            const responseClone = fetchResponse.clone();
                            caches
                                .open(CACHE_NAME)
                                .then((cache) =>
                                    cache.put(event.request, responseClone),
                                );
                        }
                    }
                    return fetchResponse;
                })
            );
        }),
    );
});
