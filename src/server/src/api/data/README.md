# data/


## Contains

### [boundingBox.js](boundingBox.js)

Handler for requesting bounding boxes on an image.

Sends a JSON formatted response structured using the [bounding box map structure](../utils/map/README.md)

### [classList](classList.js)

Handler for requesting the list of recognized object classes.

Sends a JSON formatted list of classes.

### [reportObject.js](reportObject.js)

Handler for reporting an incorrect bounding box on an image.

Sends a JSON formatted response with the ID of the removed bounding box
