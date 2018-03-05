#!/bin/bash

colorize() {
    echo -e "$(tput setaf $2)$1$(tput sgr0)";
}

colorize() {
    echo -e "$(tput setaf $2)$1$(tput sgr0)";
}

#put me in the right dir
pushd $(dirname $0)/../../src/server &> /dev/null

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

# Run the build, and install libraries
echo "Running build script with $build_tool"
${build_tool} run build \
  && pushd ../../build &> /dev/null \
  && ${build_tool} install \
  && popd &> /dev/null

# success
popd &> /dev/null
echo $(colorize "✔ Setup completed successfully" 2)
exit 0
