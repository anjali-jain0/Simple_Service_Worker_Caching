const cacheName = 'v1';

const cacheAssets = [
	'./index.html' ,
	'./about.html' ,
	'./css/style.css',
	'./js/main.js'
]

self.addEventListener('install' , (e) => {
	console.log('Service Worker installed');

	e.waitUntil(
		caches
			.open(cacheName)
			.then(cache => {
				console.log('Service Worker : Caching Files');
				cache.addAll(cacheAssets);
			})
			.then(() => self.skipWaiting())
		);
});

self.addEventListener('activate' , (e) => {
	console.log('Service Worker activated');

	e.waitUntil(
		cache.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cache => {
					if(cache !== cacheName){
						console.log('Service Worker : Clearing Old Cache');
						return caches.delete(cache);
					}
				})
				);
		})
		);
});

self.addEventListener('fetch' , (e) => {
	console.log('Service Worker : Fetching');
	e.respondWith(
		fetch(e.request).catch(() => caches.match(e.request))
		)
})
