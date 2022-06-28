// Copyright 2017-2022 TechAurelian. All rights reserved.
// Use of this source code is governed by an MIT-style license that can be
// found in the LICENSE file.

'use strict';

var CACHE_NAME = 'leavepage-cache-v3';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/output.css',
  '/js/app.js',
  '/img/somewhere-in-time.jpg',
  '/audio/come-back-to-me.wav',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE).then(() => self.skipWaiting());
    })
  );
});

function deleteCaches(filter) {
  return caches.keys()
    .then(keys => filter ? keys.filter(filter) : keys)
    .then(keys => keys.map(key => caches.delete(key)))
    .then(deletions => Promise.all(deletions));
}

self.addEventListener('activate', event => {
  deleteCaches(name => name !== CACHE_NAME);
  return event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
