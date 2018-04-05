# postgres/

PostgreSQL Config Files

## Contains

### config.json

The configuration for a development and production database. Structured as:

```json
{
    "development": {
        "user": "dev-user-name",
        "host": "dev-user-host",
        "database": "dev-db-name",
        "password": "dev-user-password",
        "port": 5432
    },
    "production": {
        "user": "prod-user-name",
        "host": "prod-db-host",
        "database": "prod-db-name",
        "password": "prod-user-password",
        "port": 5432
    }
}
```