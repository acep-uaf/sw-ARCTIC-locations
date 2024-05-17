const fs = require('fs');
const csv = require('csv-parser');
const GeoJSON = require('geojson');

const data = [];

fs.createReadStream('data/coordinates.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Convert latitude and longitude to numbers
    row.Latitude = parseFloat(row.Latitude);
    row.Longitude = parseFloat(row.Longitude);

    // Add the row directly to the data array
    data.push(row);
  })
  .on('end', () => {
    const geoJson = GeoJSON.parse(data, {Point: ['Latitude', 'Longitude']});
    fs.writeFileSync('data/coordinates.geojson', JSON.stringify(geoJson, null, 2));
    console.log('CSV file successfully processed');
  });