# remote/

This folder contains scripts that handle remote deployment of our application on AWS.

### [db.sh](db.sh)
This script will log you into the production database.

### [deploy.sh](deploy.sh)
This script runs the build and pushes the result onto the EC2 instance. It also starts the server using PM2.

### [login.sh](login.sh)
This script will allow you to ssh into the EC2 instance without having to provide credentials.