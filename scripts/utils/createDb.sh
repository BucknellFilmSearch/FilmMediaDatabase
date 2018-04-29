#!/bin/bash

colorize() {
    printf "$(tput setaf $2)$1$(tput sgr0)";
}

#put me in the right dir
pushd $(dirname $0)/../../ &> /dev/null

# Check for psql
type psql &> /dev/null
if [[ $? != 0 ]]; then
  printf "$(colorize "✘ Please install psql and then run this script again..." 1)\n"
  exit 1
else
  printf "$(colorize '✔ Found psql install:' 2) $(psql --version)\n"
fi

# Dump remote database
psql -c 'DROP DATABASE IF EXISTS filmtvse;'
psql -c 'CREATE DATABASE filmtvse;'
psql filmtvse < src/schema.sql

# success
popd &> /dev/null
exit 0
