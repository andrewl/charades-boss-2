#!/bin/bash
# Use set -x for debugging
set -x
CB_ROOT=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"/.."
BUILD_TYPE=${BUILD_TYPE:-"debug"}
pushd $CB_ROOT
echo "Building JS from JSX"
jsx -x jsx src/ www/js
echo "Building Charades Data"
php ./tools/charades_csv_to_json.php ./res/data/charades.csv > ./htdocs/js/data.js
echo "Building App"
cordova build android --$BUILD_TYPE
popd
