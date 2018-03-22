
pushd $(dirname $0) &> /dev/null

# Load data from config json
user=$(../utils/read.py ../../credentials/ec2/config.json user)
addr=$(../utils/read.py ../../credentials/ec2/config.json addr)

ssh -i ../../credentials/ec2/default_cred.pem $user@$addr