const CACHE_NAME = 'pgf-calc2-v6';
const ASSETS = [
  './pgf.html',
  './manifest.json'
];

// インストール時: キャッシュに登録
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// アクティベート時: 自分のアプリの古いキャッシュだけを削除
// （Cache Storage は住所単位で共有されるため、接頭辞で絞らないと他アプリの分まで消す）
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k.startsWith('pgf-calc2-') && k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// フェッチ時: キャッシュ優先（オフライン対応）
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
