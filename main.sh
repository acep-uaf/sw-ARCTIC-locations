# location cleaning script: ingests google sheet, outputs csv
rscript code/location_cleaning.R

# convert csv output to geojson, preparation for mapbox mapping
node code/csv_to_geojson.js