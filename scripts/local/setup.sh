#!/bin/bash

colorize() {
    echo -e "$(tput setaf $2)$1$(tput sgr0)";
}

# if anything errors out, quit

colorize() {
    echo -e "$(tput setaf $2)$1$(tput sgr0)";
}

#put me in the right dir
pushd $(dirname $0)/../../src/server >> /dev/null

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

# Install js libs with yarn if it's found, otherwise with npm
type yarn &> /dev/null
if [[ $? == 0 ]]; then
  echo 'Installing static dependencies with yarn'
  yarn global add watchify \
  && echo $(colorize 'Success' 2) \
  || echo $(colorize 'Failed to install watchify - you must install it manually by running "yarn global add watchify" to run the dev build' 1)
  yarn install &
else
  echo 'Installing static dependencies with npm'
  popd >> /dev/null
  npm install -g watchify \
  && echo $(colorize 'Success' 2) \
  || echo $(colorize 'Failed to install watchify - you must install it manually by running "npm install -g watchify" to run the dev build' 1)
  npm install &
fi

wait $(jobs -p)

# success
echo $(colorize "✔ Setup completed successfully" 2)
exit 0
