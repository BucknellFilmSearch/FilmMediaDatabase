#!/bin/bash

colorize() {
    echo -e "$(tput setaf $2)$1$(tput sgr0)";
}

log() {
    while read line; do
        echo "$(colorize "[$1]" $2) $line";
    done;
}

pythonLogClr=3
nodeLogClr=1

trap 'kill $(jobs -p) &> /dev/null' SIGINT

# This script starts up the development session on localhost:8080
pushd $(dirname $0) &> /dev/null
pushd .. &> /dev/null

mkdir -p logs
logdir=$(pwd)/logs

colorize 'Starting Session' 2

pushd src &> /dev/null
python main.py 2>&1 | tee ${logdir}/python.log | log 'python' 3 &

pushd static/js &> /dev/null
npm start 2>&1 | tee $logdir/node.log | log 'node' 1

popd &> /dev/null
popd &> /dev/null
popd &> /dev/null
popd &> /dev/null

colorize '\nSession successfully stopped' 2

exit 0
