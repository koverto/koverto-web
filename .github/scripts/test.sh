#!/bin/sh

set -eu

npm run lint:nofix
npm test
