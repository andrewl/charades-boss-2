#!/bin/bash
# Use set -x for debugging
set -x
CB_ROOT=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"/.."
KEYSTORE=${KEYSTORE:-"my-release-key.keystore"}
pushd $CB_ROOT
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $KEYSTORE ./platforms/android/build/outputs/apk/android-release-unsigned.apk $KEYSTORE_ALIAS 
zipalign -v 4 ./platforms/android/build/outputs/apk/android-release-unsigned.apk charades-boss.apk
popd
