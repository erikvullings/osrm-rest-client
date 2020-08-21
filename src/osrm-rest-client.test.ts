import { OSRM, IOsrmRoute, IOsrmRouteLeg, IOsrmWaypoint } from './osrm-rest-client';
import test from 'ava';

test.cb('test nearest service', (t) => {
  const osrm = OSRM();
  osrm.nearest(
    {
      coordinates: [[4.32734, 52.109428]],
      number: 3,
    },
    (err, result) => {
      if (err) {
        t.fail(err.message);
      } else {
        const waypoints = result?.waypoints || ({} as IOsrmWaypoint[]);
        t.assert(waypoints);
        t.is(waypoints.length, 3);
      }
      t.end(err);
    }
  );
});

test('test async nearest service', async (t) => {
  const osrm = OSRM();
  const result = await osrm.nearest({
    coordinates: [[4.32734, 52.109428]],
    number: 3,
  });
  const waypoints = result?.waypoints || ({} as IOsrmWaypoint[]);
  t.assert(waypoints);
  t.is(waypoints.length, 3);
});

test.cb('test route service', (t) => {
  const osrm = OSRM();
  osrm.route(
    {
      coordinates: [
        [13.43864, 52.51993],
        [13.415852, 52.513191],
      ],
    },
    (err, result) => {
      if (err) {
        t.fail(err.message);
      } else {
        t.assert(result);
        t.is(result?.routes.length, 1);
      }
      t.end(err);
    }
  );
});

test.cb('test route service with steps', (t) => {
  const osrm = OSRM();
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
    (err, result) => {
      if (err) {
        t.fail(err.message);
      } else {
        const routes = result?.routes || ({} as IOsrmRoute[]);
        const legs = routes[0].legs || ({} as IOsrmRouteLeg[]);
        const steps = legs[0].steps;
        t.assert(steps);
        t.is(result?.routes.length, 1);
      }
      t.end(err);
    }
  );
});

test('test async route service with steps', async (t) => {
  const osrm = OSRM();
  const result = await osrm.route({
    coordinates: [
      [13.43864, 52.51993],
      [13.415852, 52.513191],
    ],
    steps: true,
    alternatives: false,
    overview: 'simplified',
    geometries: 'polyline',
  });
  const routes = result?.routes || ({} as IOsrmRoute[]);
  const legs = routes[0].legs || ({} as IOsrmRouteLeg[]);
  const steps = legs[0].steps;
  t.assert(steps);
  t.is(result?.routes.length, 1);
});

test.cb('test trip service using callbacks', (t) => {
  const osrm = OSRM();
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
    (err, result) => {
      if (err) {
        t.fail(err.message);
      } else {
        t.assert(result);
        const distance = (result && result.trips && result.trips.length > 0 && result.trips[0].distance) || 0;
        t.assert(distance > 1000);
      }
      t.end(err);
    }
  );
});

test('test async trip service', async (t) => {
  const osrm = OSRM();
  const trip = await osrm.trip({
    coordinates: [
      [13.43864, 52.51993],
      [13.415852, 52.513191],
    ],
    steps: true,
    overview: 'simplified',
    geometries: 'polyline',
  });

  t.assert(trip);
  const distance = (trip && trip.trips && trip.trips.length > 0 && trip.trips[0].distance) || 0;
  t.assert(distance > 1000);
});

test.cb('test match service', (t) => {
  const osrm = OSRM();
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
    (err, result) => {
      if (err) {
        t.fail(err.message);
      } else {
        t.assert(result);
        const distance =
          (result && result.matchings && result.matchings.length > 0 && result.matchings[0].distance) || 0;
        t.assert(distance > 500);
      }
      t.end(err);
    }
  );
});

test('test async match service', async (t) => {
  const osrm = OSRM();
  const result = await osrm.match({
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
  t.assert(result);
  const distance = (result && result.matchings && result.matchings.length > 0 && result.matchings[0].distance) || 0;
  t.assert(distance > 500);
});

test.cb('test table service using callback', (t) => {
  const osrm = OSRM();
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
    (err, result) => {
      if (err) {
        t.fail(err.message);
      } else {
        t.assert(result);
        const duration = (result && result.durations && result.durations.length > 0 && result.durations[0][0]) || 0;
        t.assert(duration > 200);
      }
      t.end(err);
    }
  );
});

test('test async table service', async (t) => {
  const osrm = OSRM();
  const table = await osrm.table({
    coordinates: [
      [13.43864, 52.51993],
      [13.415852, 52.513191],
      [13.333086, 52.4224],
    ],
    sources: [0],
    destinations: [1, 2],
  });
  t.assert(table);
  const duration = (table && table.durations && table.durations.length > 0 && table.durations[0][0]) || 0;
  t.assert(duration > 200);
});

test.cb('test tile service', (t) => {
  const osrm = OSRM();
  osrm.tile([17603, 10747, 15], (err, result) => {
    if (err) {
      t.fail(err.message);
    } else {
      t.assert(result);
    }
    t.end(err);
  });
});

test('test async tile service', async (t) => {
  const osrm = OSRM();
  const tile = await osrm.tile([17603, 10747, 15]);
  t.truthy(tile);
});

test('test async tile service using promise', (t) => {
  const osrm = OSRM();
  return osrm
    .tile([17603, 10747, 15])
    .then((tile) => {
      t.truthy(tile);
    })
    .catch((err) => {
      t.fail(err);
    });
});
