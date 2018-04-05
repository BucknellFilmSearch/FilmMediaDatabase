# api/

This folder contains all API endpoints for the search engine backend.

All API calls returning data will have the data wrapped in the following code structure

```json
{
    "status": "number",
    "result": "data"
}
```

## Contains

- [Feedback sending](contact/)
- [Requests for data](data/)
- [All searches](search/)
- [Utilities](contact/)
