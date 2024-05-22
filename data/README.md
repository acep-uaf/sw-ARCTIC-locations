# /data

## `raw_locations.csv`
This CSV contains raw data pulled from the ARCTIC locations Google Sheet, which can be found using this [link to Google Sheets](https://docs.google.com/spreadsheets/d/1Gaj0-5pk5Q5kBVbD-5Gz2AjE6XbgHS1akB0kegIu3wE) (Note: permissions needed).

This file was imported by `location_cleaning.R`.

| Column Name |
|-------|
Search by
Name
State / Region
Borough
School District
Partner orgs
Energy Utility
Programs
Projects / Tasks / Products
Data Inventory (from Dataset Locations - From Datasets)
People

<br>
<br>

## `communities.csv`

Courtesy of AK Dept. of Commerce, Community, & Economic Development

CSV containing data about Alaska incorporated and unincorporated community locations. This includes all City and Borough classes, CDP's, and localities (places of interest). It also includes communities considered to be historic (no longer populated).

[Download the Data at the Alaska State Geoportal](https://gis.data.alaska.gov/datasets/DCCED::communities-incorporated-and-unincorporated-cities-boroughs-cdps-localities/about)

This file was imported to `location_cleaning.R` to establish coordinates of our named communties. Columns of interest: `CommunityName` (joining key), `x` (Longitude), and `y` (Latitude). The rest of the columns were dropped. 

| Column Name |
|-------------|
OBJECTID 
CommunityId 
CommunityName 
CommunityTypeName 
CommunityTypeID 
CommunityAreaTypeName 
CommunityAreaTypeID 
StartDate 
EndDate 
IsActive 
Comments 
GlobalID 
created_user 
created_date 
last_edited_user 
last_edited_date 
x 
y 
x_auxmerc 
y_auxmerc 
StatePlaneZone 
AltStatePlaneZone 
RODistrictNumber 
RODistrictName 
AltRODistrictNumber 
AltRODistrictName

<br>
<br>

## `coordinates.csv`
This file is the output of `location_cleaning.R`. The data represents cleaned ARCTIC location data, geocoded by joining to `communities.csv` by name in order to get lat/long coordinates. (Note: 7 communities were outside of Alaska and therefore not included in `communities.csv`. In these instances, lat/long coordinates of the town were pulled manually from maps.google.com) 

| Column Name |
|-------------|
ARCTIC 
Name 
State
Partners 
Utility 
Latitude 
Longitude

<br>
<br>

## `coordinates.geojson`
This file is `coordinates.csv` run through the script `csv_to_geojson.js` to convert from CSV to GeoJSON in preparation for mapping. All fields from `coordinates.csv` are maintained. `Latitude` and `Longitude` are converted to `features.geometry.coordinates`, while the remaining fields are under `features.properties`. 
