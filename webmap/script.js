mapboxgl.accessToken = 'pk.eyJ1IjoiYWJyZWNrbyIsImEiOiJjbWg5cmczNnAwdXBlMnFvbnJtdXZiN3VoIn0.r0GmwIPsEyZikOfrHNzMkA';

const map = new mapboxgl.Map({
  container: 'map', // container ID
  center: [-122.265, 37.870], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 11.94, 
  style: 'mapbox://styles/abrecko/cmh9rn7q700qh01r5g902bxcz',
    });
