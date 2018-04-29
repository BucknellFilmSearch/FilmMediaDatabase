#!/bin/bash

colorize() {
    printf "$(tput setaf $2)$1$(tput sgr0)";
}

#put me in the right dir
pushd $(dirname $0)/../../ &> /dev/null

# Check for psql
./scripts/utils/createDb.sh
if [[ $? != 0 ]]; then
  exit 1
fi

# Get all login info for the db from the config file
ruser=$(./scripts/utils/read.py configuration/postgres/config.json production.user)
rhost=$(./scripts/utils/read.py configuration/postgres/config.json production.host)
rdatabase=$(./scripts/utils/read.py configuration/postgres/config.json production.database)
rpassword=$(./scripts/utils/read.py configuration/postgres/config.json production.password)
rport=$(./scripts/utils/read.py configuration/postgres/config.json production.port)

luser=$(./scripts/utils/read.py configuration/postgres/config.json development.user)
lhost=$(./scripts/utils/read.py configuration/postgres/config.json development.host)
ldatabase=$(./scripts/utils/read.py configuration/postgres/config.json development.database)
lpassword=$(./scripts/utils/read.py configuration/postgres/config.json development.password)
lport=$(./scripts/utils/read.py configuration/postgres/config.json development.port)

# Dump remote database
printf "Dumping $rdatabase@$rhost:$rport as $ruser\n"
PGPASSWORD=$rpassword \
  pg_dump --no-privileges --no-owner --no-reconnect -a --host=$rhost --username=$ruser --dbname=$rdatabase --file=.db.tmp

printf "Loading into local $ldatabase\n"
psql filmtvse -v ON_ERROR_STOP=1 < .db.tmp

printf "Cleaning up temporary file\n"
rm .db.tmp

# success
popd &> /dev/null
exit 0
