# Here stands the script to list, clean, and add coordinates to ARCTIC project locations

# first thing's first, build a library
# library(rstudioapi)
library(googlesheets4)

library(readr)
library(dplyr)
library(stringr)

# # quick trick to make sure filepaths remain solvent regardless of directory location
# # pull filepath to this script
# script_directory <- dirname(rstudioapi::getActiveDocumentContext()$path)
# # set working directory to location of this script
# setwd(script_directory)
# # then back up one directory layer to get to the project directory
# setwd("../")
# # quick check
# getwd()

# read from google sheets
raw_locations <- read_sheet("https://docs.google.com/spreadsheets/d/1Gaj0-5pk5Q5kBVbD-5Gz2AjE6XbgHS1akB0kegIu3wE")

write_csv(raw_locations, "data/raw_locations.csv")

# find and replace character strings
locations <- raw_locations %>%
    rename("State" = "State / Region",
           "ARCTIC" = "Search by",
           "Partners" = "Partner orgs",
           "Utility" = "Energy Utility"
           ) %>%
    select(c(`ARCTIC`,
             `Name`, 
             `State`,
             `Partners`,
             `Utility`
             )) %>%
    mutate(`State` = 
             str_replace_all(`State`,
                             # old_string = new_string
                             c("AK - Alaska" = "Alaska",
                               "CA - California" = "California",
                               "Nunavut - Canada" = "Nunavut",
                               "NWT - Northwest Territories" = "Northwest Territories",
                               "HI - Hawaii" = "Hawaii",
                               "NY - New York" = "New York"
                               )
                             )
           )%>%
    # change California to Bodega Bay (Peter Asmus location)
     mutate(`Name` = 
              str_replace_all(`Name`,
                              # old_string = new_string
                              c("California" = "Bodega Bay")
                              )
    )


# pull coordinate data from Dept. of Commerce, Community, & Economic Development
# link: https://gis.data.alaska.gov/datasets/DCCED::communities-incorporated-and-unincorporated-cities-boroughs-cdps-localities/about

raw_communities <- read_csv("./data/communities.csv")

communities <- raw_communities %>%
    rename("Name" = "CommunityName",
           "Latitude" = y,
           "Longitude" = x
           ) %>%
    select(`Name`, 
           `Latitude`,
           `Longitude`
           )


# join ARCTIC site locations to AK community coordinate data
raw_coordinates <- left_join(locations, communities, join_by("Name"))

# cleaning
coordinates <- raw_coordinates %>%
  
# manual deletions (Where is the TOWN "Alaska"? Not the geographic center. Confusing. Delete for now.)
filter(Name != "Alaska") %>%
  
# manual additions
mutate(Latitude = if_else(Name == "Bodega Bay", 38.33487, Latitude),
       Longitude = if_else(Name == "Bodega Bay", -123.04810, Longitude)) %>%

mutate(Latitude = if_else(Name == "Gjoa Haven", 68.62506, Latitude),
       Longitude = if_else(Name == "Gjoa Haven", -95.87750, Longitude)) %>%

mutate(Latitude = if_else(Name == "Inuvik", 68.35940, Latitude),
       Longitude = if_else(Name == "Inuvik", -133.72940, Longitude)) %>%

mutate(Latitude = if_else(Name == "Manoa", 21.31561, Latitude),
       Longitude = if_else(Name == "Manoa", -157.80400, Longitude)) %>%

mutate(Latitude = if_else(Name == "Nunavut", 63.74675, Latitude),
       Longitude = if_else(Name == "Nunavut", -68.51697, Longitude)) %>%

mutate(Latitude = if_else(Name == "Saratoga Springs", 43.08323, Latitude),
       Longitude = if_else(Name == "Saratoga Springs", -73.78478, Longitude))

# These coords pulled from Google Maps
# Bodega Bay = 38.33487, -123.04810
# Gjoa Haven = 68.62506, -95.87750
# Inuvik = 68.35940, -133.72940
# Manoa = 21.31561, -157.80400
# Nunavut (Iqaluit?) = 63.74675, -68.51697
# Saratoga Springs = 43.08323, -73.78478




#########
# Write #
#########
write_csv(coordinates, "data/coordinates.csv")

test_load <- read_csv("data/coordinates.csv")