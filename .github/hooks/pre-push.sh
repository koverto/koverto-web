#!/bin/sh

set -eu

git stash push -u
./.github/scripts/test.sh
git stash pop || true
