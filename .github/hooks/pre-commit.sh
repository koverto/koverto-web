#!/bin/sh

set -eu

git stash push -ku
./.github/scripts/test.sh
git stash pop || true
