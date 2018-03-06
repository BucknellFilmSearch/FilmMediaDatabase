#!/bin/bash

colorize() {
    echo -e "$(tput setaf $2)$1$(tput sgr0)";
}

log() {
    while read line; do
        echo "$(colorize "[$1]" $2) $line";
    done;
}

pythonLogClr=4
nodeLogClr=1

# Stop all jobs on ctrl-C
trap 'kill $(jobs -p) &> /dev/null' SIGINT

pushd $(dirname $0)/../../ &> /dev/null

# Set log directory
mkdir -p logs
logdir=$(pwd)/logs

colorize 'Starting Server (use ctrl-C to exit)' 2
pushd src/server/ &> /dev/null

# Start frontend and backend watching servers
yarn dev-server 2>&1 | tee ${logdir}/backend.log | log 'dev-backend' 4 &
yarn dev-static 2>&1 | tee ${logdir}/frontend.log | log 'dev-frontend' 1

popd &> /dev/null
popd &> /dev/null

colorize '\nServer successfully stopped' 2

exit 0
