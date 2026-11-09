// Nacer chat service worker: يتيح عرض الإشعارات بأيقونة التطبيق ويجعل الموقع قابلاً للتثبيت
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const hash = (e.notification.data && e.notification.data.hash) || '';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) {
      if ('focus' in c) { c.postMessage({ hash }); return c.focus(); }
    }
    if (self.clients.openWindow) return self.clients.openWindow('./' + (hash ? '#' + hash : ''));
  }));
});
