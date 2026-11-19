// Gerado por tools/web.js
const CACHE = "anima-vts-1.5.0-mwny9r0z";
const ASSETS = ["./","fonts/inter-latin-400-normal.woff2","fonts/inter-latin-500-normal.woff2","fonts/inter-latin-600-normal.woff2","fonts/inter-latin-ext-400-normal.woff2","fonts/inter-latin-ext-500-normal.woff2","fonts/inter-latin-ext-600-normal.woff2","fonts.css","icons/icon-180.png","icons/icon-192.png","icons/icon-512.png","manifest.webmanifest","vendor/jszip.min.js","vendor/three.min.js"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  // páginas: internet primeiro (sempre a versão mais nova), cache só sem internet
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).then((r) => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then((k) => k.put(e.request, c)); } return r; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then((h) => h || caches.match("./"))));
    return;
  }
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((hit) => {
    const net = fetch(e.request).then((r) => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then((k) => k.put(e.request, c)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
