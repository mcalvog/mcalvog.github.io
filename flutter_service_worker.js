'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "afa9afefa65f6362040505c330be4f22",
"assets/AssetManifest.bin.json": "b0cc06c92eac7b4d95d1f86ae63bd1c9",
"assets/AssetManifest.json": "de0afc6b0e35c4d59fcc50b2d82f3281",
"assets/assets/fonts/Mulish-Bold.ttf": "b7fa867b7522c7629eca3c4b9f31d3c8",
"assets/assets/fonts/Mulish-ExtraBold.ttf": "2000e3092f7d4527368cb41d357fe356",
"assets/assets/fonts/Mulish-ExtraLight.ttf": "c07e2efe99c3f232b9011aac63b0389b",
"assets/assets/fonts/Mulish-Regular.ttf": "5416a925ffafb775c6bffd116d87deb0",
"assets/assets/fonts/Mulish-SemiBold.ttf": "a4e6f571273de05494ef24d6fb65c885",
"assets/assets/images/app_icon.png": "00e1872d9fc86bad082b02db602a7e5c",
"assets/assets/images/bg.png": "b2bcbe3a7e5ea8ee2809462c4c667720",
"assets/assets/images/profile.jpg": "ec518e7d18d5d1d9d7930480a12dc7ba",
"assets/assets/strings/strings_en.arb": "12b951aca46aec94b1f78e603d4c55ed",
"assets/assets/strings/strings_es.arb": "6b9a36880bbc09bdf71a979d1b9732f4",
"assets/FontManifest.json": "7280dbd1ac51709b923ef48e4b02f99d",
"assets/fonts/MaterialIcons-Regular.otf": "c0ad29d56cfe3890223c02da3c6e0448",
"assets/NOTICES": "54a680bbcf3a6f8871450a858754a186",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "38c8566d10aa4df502ceaaad7e939ded",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "bf21cd8fd775a3c59fd53afdee39e0e6",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "a2eb084b706ab40c90610942d98886ec",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "86e461cf471c1640fd2b461ece4589df",
"canvaskit/canvaskit.js.symbols": "68eb703b9a609baef8ee0e413b442f33",
"canvaskit/canvaskit.wasm": "efeeba7dcc952dae57870d4df3111fad",
"canvaskit/chromium/canvaskit.js": "34beda9f39eb7d992d46125ca868dc61",
"canvaskit/chromium/canvaskit.js.symbols": "5a23598a2a8efd18ec3b60de5d28af8f",
"canvaskit/chromium/canvaskit.wasm": "64a386c87532ae52ae041d18a32a3635",
"canvaskit/skwasm.js": "f2ad9363618c5f62e813740099a80e63",
"canvaskit/skwasm.js.symbols": "80806576fa1056b43dd6d0b445b4b6f7",
"canvaskit/skwasm.wasm": "f0dfd99007f989368db17c9abeed5a49",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206",
"favicon.png": "0e9a6e0553a7b214676096e429ce7df2",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"flutter_bootstrap.js": "1d833fe24478666f03cd361871ea47dd",
"humans.txt": "8ecd6719aef6de0c22c5d9a014d3d02d",
"icons/Icon-192.png": "7341b465b45ad947a59c83f712c33df5",
"icons/Icon-512.png": "13aeb19bfec8878246f8bf623e99e407",
"icons/Icon-maskable-192.png": "7341b465b45ad947a59c83f712c33df5",
"icons/Icon-maskable-512.png": "13aeb19bfec8878246f8bf623e99e407",
"index.html": "3d497bed1402e05cc025825882181d3f",
"/": "3d497bed1402e05cc025825882181d3f",
"main.dart.js": "49728ef5bae23913514057303f27d420",
"manifest.json": "0b724d49e9ca71a030ed72ec6a5dcf68",
"splash/img/dark-1x.png": "a5d9a2ff793c64e343ecc0a40bf48757",
"splash/img/dark-2x.png": "1e9e3587659b8c96447c68ca185a12e6",
"splash/img/dark-3x.png": "eea593006c8e96ca1d2e8d16608e6463",
"splash/img/dark-4x.png": "86ad7d0025867dafd749fd8bf1f38dc4",
"splash/img/light-1x.png": "a5d9a2ff793c64e343ecc0a40bf48757",
"splash/img/light-2x.png": "1e9e3587659b8c96447c68ca185a12e6",
"splash/img/light-3x.png": "eea593006c8e96ca1d2e8d16608e6463",
"splash/img/light-4x.png": "86ad7d0025867dafd749fd8bf1f38dc4",
"version.json": "367012baf681b8f9bf33fe0dfc64466c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
