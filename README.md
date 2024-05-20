# Stoatworks ARCTIC Program Location Map

## Welcome
This repository contains the code and data necessary to build an interactive web map of ARCTIC program locations. The map can be [viewed here](https://acep-uaf.github.io/sw-ARCTIC-locations/)

## Embed or Link to the Map
To embed the map in your website, use the following HTML code:

```
<iframe 
    width="600" 
    height="450" 
    frameborder="0" 
    style="border:0" 
    src="https://acep-uaf.github.io/sw-ARCTIC-locations/" 
    allowfullscreen>
</iframe>
```


## Update, Debug, or Develop
If you would like to update ARCTIC locations, debug problems with the map, or develop new features, start by cloning the repository to your local machine.

The following steps assume you have `R`, `renv` (for managing R dependencies), `node.js`, and `npm` installed:

## Install R Dependencies
Once the repository has been cloned to your computer, install the necessary R dependencies
1. In a terminal window, navigate to the root directory of the repo
2. Start R by typing `R` and pressing Enter
3. In the R console, run the following command to install `renv` (`renv` is a package manager similar to `npm`):
```
install.packages("renv")
```

or if you already have `renv` on your global system, skip and run:
```
renv::restore()
```
This will install the R packages specified in the `renv.lock` file. 

4. Quit R by typing `q()` and pressing Enter

## Install Javascript Dependencies
To install Javascript dependencies, navigate to the repo and run `npm install`. 

## Adding Changes
Changes made to update, debug, or develop are best done in a new branch such as `feature/your_cool_widget` or `bugfix/your_solution`. This new local branch can be pushed to a new branch on the remote, then a pull request made to merge the changes into `main`. Please note that direct commits to main are blocked so as not to break the public map. Pull requests will need approval before merging. All merges to `main` will rebuild the map. 