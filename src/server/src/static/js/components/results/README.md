# results/

All React components that handle displaying the search results.

## Contains

### [AllFilms.jsx](AllFilms.jsx)
The outer shell container for displaying all of the films after the initial search. It handles most of the state
passing.

### [BoundingBox.jsx](BoundingBox.jsx)
The react component that draws the bounding boxes over images. 

### [ContextDialog.jsx](ContextDialog.jsx)
A full screen modal that allows the user to move between images in a single movie.

### [IndividualFilmResults.jsx](IndividualFilmResults.jsx)
The screenshot grid for a single film.

### [MetaDataDrawer.jsx](MetaDataDrawer.jsx)
This components renders the metadata information for a single film that appears on the right hand side of the screen
after the user runs a search.

### [ResultsToolbar.jsx](ResultsToolbar.jsx)
Renders the toolbar seen after the initial search. This toolbar gives the user numerous options for updating or
filtering the results.

### [ScreenshotWithCaption.jsx](ScreenshotWithCaption.jsx)
Displays each image in the image grid.

### [SVGCircle.jsx](SVGCircle.jsx)
Renders the circles seen after a user clicks on an image and is brought to the single movie view. 