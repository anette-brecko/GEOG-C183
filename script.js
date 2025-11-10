mapboxgl.accessToken = 'pk.eyJ1IjoiYWJyZWNrbyIsImEiOiJjbWg5cmczNnAwdXBlMnFvbnJtdXZiN3VoIn0.r0GmwIPsEyZikOfrHNzMkA';

const map = new mapboxgl.Map({
  container: 'map', // container ID
  center: [-122.265, 37.870], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 11.94, 
  style: 'mapbox://styles/abrecko/cmh9rn7q700qh01r5g902bxcz',
    });

map.on('load', function() {

  map.addSource('points-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/anette-brecko/GEOG-C183/refs/heads/main/data/183data.geojson'
    });

    map.addLayer({
        id: 'points-layer',
        type: 'circle',
        source: 'points-data',
        paint: {
            'circle-color': '#079C39',
            'circle-radius': 6,
            'circle-stroke-width': 1.5,
            'circle-stroke-color': '#000000'
        }
    });


 map.on('click', 'points-layer', (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const properties = e.features[0].properties;
      const directions = `https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${properties.Y},${properties.X}`

      const popupContent = `
            <div>
                <h3>${properties.Landmark}</h3>
                <p><strong>Address:</strong> ${properties.Address}</p>
                <p><strong>Architect:</strong> ${properties["Architect & Date"]}</p>
                <p><strong>Designated:</strong> ${properties.Designated}</p>
                ${properties.Notes ? `<p><strong>Notes:</strong> ${properties.Notes}</p>` : ''}
                <p><strong>Get Directions:</strong> <a href="${directions}" target="_blank">Open in Google Maps</a></p>
            </div>`;

      new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popupContent)
            .addTo(map);
    });

     // Change cursor to pointer when hovering over points
    map.on('mouseenter', 'points-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change cursor back when leaving points
    map.on('mouseleave', 'points-layer', () => {
        map.getCanvas().style.cursor = '';
    });
});