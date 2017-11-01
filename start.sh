#!/bin/bash

trap 'kill %1' SIGINT

# This script starts up the development session on localhost:8080
pushd $(dirname $0) &> /dev/null

mkdir -p logs
logdir=$(pwd)/logs

pushd src &> /dev/null
python main.py 2>&1 | tee ${logdir}/python.log | sed -e 's/^/[Python] /' &

pushd static/js &> /dev/null
npm start 2>&1 | tee $logdir/node.log | sed -e 's/^/[Node]   /'

popd &> /dev/null
popd &> /dev/null
popd &> /dev/null
echo "Session successfully started"
exit 0
