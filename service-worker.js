// 서비스 워커 기본 템플릿
const CACHE_NAME = 'eng-vocab-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // 만약 CSS나 JS 파일이 따로 있다면 여기에 추가하세요. 예: '/style.css'
  '/manifest.json',
  '/icon.png'
];

// 설치 시 캐시 저장
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 네트워크 요청 시 캐시 우선 사용
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});