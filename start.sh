#!/bin/bash

# This script starts up the development session on localhost:8080
pushd $(dirname $0) >> /dev/null

pushd src >> /dev/null
python main.py >> /dev/null &

pushd static/js >> /dev/null
npm start --silent >> /dev/null &

popd >> /dev/null
popd >> /dev/null
popd >> /dev/null
echo "Session successfully started"
exit 0
