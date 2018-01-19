#!/bin/bash

colorize() {
    echo -e "$(tput setaf $2)$1$(tput sgr0)";
}

# if anything errors out, quit
set -e

#put me in the right dir
pushd $(dirname $0) >> /dev/null
pushd .. >> /dev/null

type pip &> /dev/null
if [[ $? != 0 ]]; then
  echo $(colorize "✘ Please install https://pip.pypa.io/en/stable/ and then run this script again..." 1)
  exit 1
else
  echo $(colorize '✔ Found Pip install:' 2) $(pip --version)
fi

# Check for either npm or yarn
type yarn &> /dev/null
if [[ $? != 0 ]]; then
  type npm &> /dev/null
  if [[ $? != 0 ]]; then
    echo $(colorize "✘ Please install https://yarnpkg.com/en/ or https://www.npmjs.com/ and then run this script again..." 1)
    exit 1
  else
    echo $(colorize '✔ Found npm install:' 2) $(npm --version)
  fi
else
  echo $(colorize '✔ Found yarn install:' 2) $(yarn --version)
fi

# Check if in a virtual environment - if not, confirm running
if [ -z "$VIRTUAL_ENV" ]; then
    echo 
    read -r -p "$(colorize "It looks like you're not in a python virtual environment, continue? [y/N] " 3 )" response
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
pip install -r requirements.txt &

# Install js libs with yarn if it's found, otherwise with npm
pushd static/js >> /dev/null
type yarn &> /dev/null
if [[ $? == 0 ]]; then
  echo 'Installing static dependencies with yarn'
  yarn install &
else
  echo 'Installing static dependencies with npm'
  npm install &
fi

wait $(jobs -p)

# success
popd >> /dev/null
popd >> /dev/null
popd >> /dev/null
popd >> /dev/null
echo $(colorize "✔ Setup completed successfully" 2)
exit 0
