# ec2/

Amazon EC2 configuration files

## Contains

### config.json

The login information for getting into the EC2 instance. Structured as:

```json
{
    "user": "ec2-username",
    "addr": "ec2-host-ip"
}
```

### credentials.pem

The credentials used to SSH into the EC2 instance (downloaded from AWS)
