# db/

Utilities for dealing with database queries

## Contains

### [query.js](query.js)

Runs a PG query, and allows for handling errors/injecting responses optionally

Default Options:

```javascript
{
    mapper: (data) => data,
    wrapper: (data, status) => wrapResponse(data, status),
    err: (err) => console.log(err),
    cb: (data, status) => console.log(data, status)
}
```

- `err` - called if `pg` returns an error
- `mapper` - maps the retrieved rows
- `wrapper` - wraps the mapped data (called after `mapper`)
- `cb` - called after mapping and wrapping happens to the retrieved data