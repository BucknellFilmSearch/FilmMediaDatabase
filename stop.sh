#!/bin/bash

# This script stops the session at localhost:8080

npm=$(ps | grep npm -m 1 | cut -c1-5)
node=$(ps | grep node -m 1 | cut -c1-5)

if [[ ${npm} -eq "" && ${node} -eq "" ]]; then
    echo "Nothing to stop..."
    exit 0
fi

while [[ ${npm} -ne "" ]]; do
    kill ${npm}
    npm=$(ps | grep npm -m 1 | cut -c1-5)
done
echo "npm processes killed"

while [[ ${node} -ne "" ]]; do
    kill ${node}
    node=$(ps | grep node -m 1 | cut -c1-5)
done
echo "node processes killed"

echo "Processes successfully stopped"
exit 0
