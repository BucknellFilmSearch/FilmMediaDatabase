# map/

Mapper functions for transforming data from database rows to the expected JSON response format

## Contains

### [boundingBoxMap.js](boundingBoxMap.js)

Mapper function that returns data formatted as:

```json
[
    {
        "textLabel": "string",
        "boundingLeft": "number",
        "boundingTop": "number",
        "boundingRight": "number",
        "boundingBottom": "number",
        "confidence": "number",
        "id": "number"
    }
]
```

### [groupedMap.js](groupedMap.js)

Mapper function that returns data formatted as:

```json
[
    {
        "runtimeInMinutes": "number",
        "genre1": "string",
        "genre2": "string",
        "genre3": "string",
        "movieReleaseYear": "number",
        "totalNumberOfLines": "number",
        "dvdReleaseYear": "number",
        "movieOclcId": "number",
        "movieTitle": "string",
        "results": [
            {
                "movieDbLineId": "number",
                "movieLineNumber": "number",
                "movieStartTimeStamp": "string",
                "movieEndTimeStamp": "string",
                "movieLineText": "string"
            }
        ]
    }
]
```

### [simpleMap.js](simpleMap.js)

Mapper function that returns data formatted as:

```json
[
    {
        "movieOclcId": "number",
        "movieTitle": "string",
        "movieDbLineId": "number",
        "movieLineNumber": "number",
        "movieStartTimeStamp": "string",
        "movieEndTimeStamp": "string",
        "movieLineText": "string",
        "movieReleaseYear": "number",
        "dvdReleaseYear": "number",
        "runtimeInMinutes": "number",
        "totalNumberOfLines": "number",
        "genre1": "string",
        "genre2": "string",
        "genre3": "string"
    }
]
```
