#!/bin/bash

colorize() {
    echo -e "$(tput setaf $2)$1$(tput sgr0)";
}

colorize() {
    echo -e "$(tput setaf $2)$1$(tput sgr0)";
}

#put me in the right dir
pushd $(dirname $0)/../../ &> /dev/null

rm -rf build

pushd src/server/ &> /dev/null

build_tool=''

# Check for either npm or yarn
type yarn &> /dev/null
if [[ $? != 0 ]]; then
  type npm &> /dev/null
  if [[ $? != 0 ]]; then
    # Ask user to install yarn or npm if neither is found
    echo $(colorize "✘ Please install https://yarnpkg.com/en/ or https://www.npmjs.com/ and then run this script again..." 1)
    exit 1
  else
    build_tool='npm'
    echo $(colorize '✔ Found npm install:' 2) $(npm --version)
  fi
else
  build_tool='yarn'
  echo $(colorize '✔ Found yarn install:' 2) $(yarn --version)
fi

# Run the build, and install libraries
echo "Running build script with $build_tool"
${build_tool} run build \
  && pushd ../../

echo "Copying to remote"
user=$(./scripts/.read.py credentials/ec2/config.json user)
addr=$(./scripts/.read.py credentials/ec2/config.json addr)
scp -i credentials/ec2/default_cred.pem -r build $user@$addr:/home/$user

# ssh -i credentials/ec2/default_cred.pem $user@$addr 'cd build && npm install'

# success
popd &> /dev/null
popd &> /dev/null
exit 0
