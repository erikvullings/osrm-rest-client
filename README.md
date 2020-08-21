# osrm-rest-client

TypeScript/JavaScript REST client for the [Open Source Routing Machine](http://project-osrm.org) v5, based on Open
Street Map data. Supports async, promises or regular callbacks. For detailed OSRM documentation, see
[here](https://github.com/Project-OSRM/osrm-backend/blob/master/docs).

The code is based on [OSRM-client](https://www.npmjs.com/package/osrm-client-js) or
[OSRM-js](https://www.npmjs.com/package/osrm.js), which are basically the same. The main differences between this
version and those others are:

- It is developed in TypeScript, so you have Intellisense support.
- It supports regular callbacks, as well as Promises or async calls.
- Profile can be specified per call, i.e. the others only supported the `driving` profile.
- It is bundled using [microbundle](https://npm.im/microbundle), so you can pick your flavour: ESM, UMD, etc.

## Playground

Please visit the [online playground](https://repl.it/repls/DarkvioletAdoredMicrobsd#index.ts) to give it a go.

## Installation

For debugging, run:

```bash
npm install
npm test
```

Or to build it, run:

```bash
npm run build
```

## Usage

### TypeScript async examples

```ts
import { OSRM, IOsrmWaypoint } from 'osrm-rest-client';

// Examples using async
const osrm = OSRM(); // Using online OSRM service at https://router.project-osrm.org
// Alternatively, supply your own `new OSRM('https://router.project-osrm.org')`
// Default search profile is `driving`, but you can override this.

const nearest = await osrm.nearest({
  coordinates: [[4.32734, 52.109428]],
  number: 3,
});
const waypoints = result?.waypoints || ({} as IOsrmWaypoint[]);
console.log(JSON.stringify(waypoints, null, 2));

const tile = await osrm.tile([17603, 10747, 15]);

const table = await osrm.table({
  coordinates: [
    [13.43864, 52.51993],
    [13.415852, 52.513191],
    [13.333086, 52.4224],
  ],
  sources: [0],
  destinations: [1, 2],
});

const match = await osrm.match({
  coordinates: [
    [8.610048, 46.99917],
    [8.620048, 46.99917],
  ],
  timestamps: [1460585940, 1460585945],
  steps: true,
  overview: 'full',
  geometries: 'polyline',
  annotations: false,
  radiuses: [49, 49],
});

const trip = await osrm.trip({
  coordinates: [
    [13.43864, 52.51993],
    [13.415852, 52.513191],
  ],
  steps: true,
  overview: 'simplified',
  geometries: 'polyline',
});

const route = await osrm.route({
  coordinates: [
    [13.43864, 52.51993],
    [13.415852, 52.513191],
  ],
  steps: true,
  alternatives: false,
  overview: 'simplified',
  geometries: 'polyline',
});
```

### JavaScript callback examples

In modern JavaScript versions, you can also use the async version provided above.

```js
var OSRM = require('osrm-rest-client');

var osrm = OSRM(); // Using online OSRM service at https://router.project-osrm.org
// Alternatively, supply your own `new OSRM('https://router.project-osrm.org')`
// Default search profile is `driving`, but you can override this.

// Examples using callbacks
osrm.route(
  {
    coordinates: [
      [13.43864, 52.51993],
      [13.415852, 52.513191],
    ],
    steps: true,
    alternatives: false,
    overview: 'simplified',
    geometries: 'polyline',
  },
  function (err, result) {
    console.log(result);
  }
);

osrm.trip(
  {
    coordinates: [
      [13.43864, 52.51993],
      [13.415852, 52.513191],
    ],
    steps: true,
    overview: 'simplified',
    geometries: 'polyline',
  },
  function (err, result) {
    console.log(result);
  }
);

osrm.match(
  {
    coordinates: [
      [8.610048, 46.99917],
      [8.620048, 46.99917],
    ],
    timestamps: [1460585940, 1460585945],
    steps: true,
    overview: 'full',
    geometries: 'polyline',
    annotations: false,
    radiuses: [49, 49],
  },
  function (err, result) {
    console.log(result);
  }
);

osrm.table(
  {
    coordinates: [
      [13.43864, 52.51993],
      [13.415852, 52.513191],
      [13.333086, 52.4224],
    ],
    sources: [0],
    destinations: [1, 2],
  },
  function (err, result) {
    console.log(result);
  }
);

osrm.tile([17603, 10747, 15], function (err, result) {
  console.log(result); // pbf encoded vector tile
});
```
