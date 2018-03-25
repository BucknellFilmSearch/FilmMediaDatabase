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

# Start frontend and backend watching servers
$build_tool dev-server 2>&1 | tee ${logdir}/backend.log | log 'dev-backend' 4 &
$build_tool dev-static 2>&1 | tee ${logdir}/frontend.log | log 'dev-frontend' 1

popd &> /dev/null
popd &> /dev/null

colorize '\nServer successfully stopped' 2

exit 0
