# src/

Holds all unbuilt source code for the server and frontend

## Contains

- [All API Endpoints](api/)
- [Postgres Client](postgres/)
- [Static files](static/)

### [index.js](index.js)

The meat and potatoes of the server - This is where the Express app is declared and set up.

All API endpoints are served by an Express Router that serves at the `/api` extension.

Static files are served from `/` and `/static`