#!/bin/bash

# if anything errors out, quit
set -e

#put me in the right dir
pushd $(dirname $0) >> /dev/null
pushd .. >> /dev/null

which pip2
if [[ $? == 1 ]]; then
  echo "Please install pip and then run this script again..."
  exit 1
fi

which npm
if [[ $? == 1 ]]; then
  echo "Please install npm and then run this script again..."
  exit 1
fi

# install pip requirments
pushd src >> /dev/null
pip install -r requirements.txt

pushd static/js >> /dev/null
npm install

# success
popd >> /dev/null
popd >> /dev/null
popd >> /dev/null
popd >> /dev/null
echo "Setup completed successfully"
exit 0
