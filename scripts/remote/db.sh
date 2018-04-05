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
else
  printf "$(colorize '✔ Found psql install:' 2) $(psql --version)\n"
fi

# Get all login info for the db from the config file
user=$(./scripts/utils/read.py configuration/postgres/config.json production.user)
host=$(./scripts/utils/read.py configuration/postgres/config.json production.host)
database=$(./scripts/utils/read.py configuration/postgres/config.json production.database)
password=$(./scripts/utils/read.py configuration/postgres/config.json production.password)
port=$(./scripts/utils/read.py configuration/postgres/config.json production.port)

printf "Logging into $database@$host:$port as $user\n"

# Log into postgres database
PGPASSWORD=$password psql --username=$user --dbname=$database --host=$host --port=$port \
  && printf "$(colorize '✔ Success' 2)\n" \
  || printf "$(colorize "✘ Error" 1)\n"

# success
popd &> /dev/null
exit 0
