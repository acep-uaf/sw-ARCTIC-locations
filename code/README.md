# /code

## `main.sh`
This bash script will run both `location_cleaning.r` and `csv_to_geojson.js` sequentially.

## `location_cleaning.R`
This script is the bread and butter of this repository. 

#### Location Import and Cleaning
* First, it connects to Google Drive (permissions needed) and downloads the spreadsheet containing ARCTIC location data. This data is written to the repo as `data/raw_locations.csv`. 

<br>

* Next, a few columns were renamed as follows:

New name | Old name 
|--------|----------
State    | State / Region 
ARCTIC   | Search by 
Partners | Partner orgs
Utility  | Energy Utility

<br>

* Then, a few strings in the column `State` were modified:

New string      | Old string
|---------------|-----------
Alaska          | AK - Alaska
California      | CA - California
Nunavut         | Nunavut - Canada
Northwest Territories | NWT- Northwest Territories
Hawaii          | HI - Hawaii
New York        | NY - New York

<br>

* And the town of `California` changed to `Bodega Bay`

<br>

#### Join Community Data

* After the location data was cleaned up, Alaska community data was pulled from the [Alaska Dept. of Commerce, Community, & Economic Development](https://gis.data.alaska.gov/datasets/DCCED::communities-incorporated-and-unincorporated-cities-boroughs-cdps-localities/about). The file is saved on the repo as `data/communities.csv` 

<br>

* Then, a quick rename of 3 columns:

New name | Old name
|--------|---------|
Name     | CommunityName
Latitude | y
Longitude| x

<br>

* After which location names and location coordinates were joined by `Name`. 

* And the record with town name = Alaska was deleted (Not a town)

* Finally, towns outside of Alaska (and therefore not on the list of AK towns) were given latitude/longitude coordinates manually using maps.google.com .

* The resulting dataframe was written to file as `data/coordinates.csv`

<br>
<br>

## `csv_to_geojson.js`
This script was written in order to convert `coordinates.csv` from CSV to GeoJSON so that the data could be mapped. All fields from `coordinates.csv` were maintained. `Latitude` and `Longitude` was converted to `features.geometry.coordinates`, while the remaining fields were written under `features.properties`. The output was saved as `data/coordinates.geojson`

<br>
<br>

## `map.js`
This script contains Javascript code to build a Mapbox map with satellite imagery. Points were placed on the map to represent ARCTIC locations, and the supporting fields were added to a label that pops when a town name is clicked. 