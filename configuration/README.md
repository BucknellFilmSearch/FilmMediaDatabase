# configuration/

All config files related to the server's operation. Primarily files that shouldn't be hosted publicly

## Contains

- [AWS API keys](api)
- [Mail Client](contact)
- [Hosting](ec2)
- [Database](postgres)

### config.json

Config for the frontend. Used to specify where images should be loaded from. Structured as:

```json
{
  "imgSrc": "https://base.image.url/"
}
```