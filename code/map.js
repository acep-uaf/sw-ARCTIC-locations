document.addEventListener('DOMContentLoaded', (event) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaWFtYWNkb3VnYWxsIiwiYSI6ImNsdndseDU5ZDI0bHAyam14ZGxqeDQ0eWgifQ.Pi9F-ktr8wcobreaClszDg';
    
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/satellite-v9', // stylesheet location
        center: [-109.75, 51.22], // starting position [lng, lat]
        zoom: 2.8, // starting zoom
    });
    
map.on('load', function () {
    fetch('data/coordinates.geojson')
    .then(response => {
        return response.json();
    })
    .then(data => {
        jsonCallback(null, data);
    })
    .catch(error => console.error('Error:', error));
});



function jsonCallback(err, data) {
    if (err) {
      throw err;
    }
  
    map.addSource('points-source', {
      'type': 'geojson',
      'data': data
    });
  
    map.addLayer({
      'id': 'points-layer',
      'type': 'circle',
      'source': 'points-source',
      'paint': {
        'circle-radius': 4.5,
        'circle-color': '#ffffff'
      }
    });

    // After adding the points layer
map.addLayer({
    'id': 'points-labels',
    'type': 'symbol',
    'source': 'points-source',
    'layout': {
      'text-field': ['get', 'Name'], // field from the source data to display
      'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
      'text-size': 12,
      'text-padding': 10
    },
    'paint': {
        'text-color': '#ffffff',
        'text-halo-color': '#000000',
        'text-halo-width': 2
    }
  });
  
  // Add click event listener to the labels layer
  map.on('click', 'points-labels', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var name = e.features[0].properties.Name;
    var arctic = e.features[0].properties.ARCTIC;
    var utility = e.features[0].properties.Utility;
    var partners = e.features[0].properties.Partners;
  
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
  
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML('<h3>' + name + '</h3><h5>Program:   ' + arctic + '</h5><h5>Partners:   ' + partners + '</h5')
    .addTo(map);
  });
  
  }
    
});
    
    
    
    
    