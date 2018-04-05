# contact/

Email Service Config Files

## Contains

### config.json

The configuration for the Nodemailer feedback client. Structured as:

```json
{
  "recipients": [
    "recipient1@domain1.com",
    "recipient2@domain2.com"
  ],
  "sender": "\"Alias Name\" <no-reply@host-domain.com>",
  "auth": {
    "user": "ses-auth-user",
    "pass": "ses-auth-pass"
  }
}
```