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
        'circle-color': '#ff0000'
      }
    });
  
  }
    
});
    
    
    
    
    