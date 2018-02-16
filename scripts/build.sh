#!/bin/bash

colorize() {
    echo -e "$(tput setaf $2)$1$(tput sgr0)";
}

colorize() {
    echo -e "$(tput setaf $2)$1$(tput sgr0)";
}

#put me in the right dir
pushd $(dirname $0)/../src &> /dev/null

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

# Build js libs with yarn if it's found, otherwise with npm
type yarn &> /dev/null
if [[ $? == 0 ]]; then
  echo 'Installing static dependencies with yarn'
  pushd static/js &> /dev/null
  yarn build
  popd &> /dev/null
  echo 'Building server'
  pushd server &> /dev/null
  yarn build
  popd &> /dev/null
else
  echo 'Installing static dependencies with npm'
  pushd static/js &> /dev/null
  npm run build
  popd &> /dev/null
  echo 'Building server'
  pushd server &> /dev/null
  npm run build
  popd &> /dev/null
fi

# wait $(jobs -p)

# success
popd &> /dev/null
echo $(colorize "✔ Setup completed successfully" 2)
exit 0
