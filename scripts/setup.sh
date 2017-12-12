#!/bin/bash

# if anything errors out, quit
set -e

#put me in the right dir
pushd $(dirname $0) >> /dev/null
pushd .. >> /dev/null

type pip2 &> /dev/null
if [[ $? != 0 ]]; then
  echo "Please install https://pip.pypa.io/en/stable/ and then run this script again..."
  exit 1
fi

# Check for either npm or yarn
type npm &> /dev/null
if [[ $? != 0 ]]; then
  type yarn &> /dev/null
  if [[ $? != 0 ]]; then
    echo "Please install https://yarnpkg.com/en/ or https://www.npmjs.com/ and then run this script again..."
    exit 1
  fi
fi

# Check if in a virtual environment - if not, confirm running
if [[ -z "$VIRTUAL_ENV" ]]; then
    echo 
    read -r -p "It looks like you're not in a python virtual environment, continue? [y/N] " response
    case "$response" in
        [yY][eE][sS]|[yY]) 
            ;;
        *)
            exit 0
            ;;
    esac
fi

# install pip requirments
pushd src >> /dev/null
pip install -r requirements.txt

# Install js libs with yarn if it's found, otherwise with npm
pushd static/js >> /dev/null
type yarn &> /dev/null
if [[ $? == 0 ]]; then
  yarn install
else
  npm install
fi

# success
popd >> /dev/null
popd >> /dev/null
popd >> /dev/null
popd >> /dev/null
echo "Setup completed successfully"
exit 0
