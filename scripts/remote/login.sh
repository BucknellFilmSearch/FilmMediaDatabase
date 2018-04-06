
pushd $(dirname $0) &> /dev/null

# Load data from config json
user=$(../utils/read.py ../../configuration/ec2/config.json user)
addr=$(../utils/read.py ../../configuration/ec2/config.json addr)

ssh -i ../../configuration/ec2/default_cred.pem $user@$addr