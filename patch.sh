#!/bin/bash

# A script to make sending patches to other rices easier

git pull --rebase

rices=(
  "groove"
  "yume"
  "yume-nonim-boxy"
  "vim_styled"
)

commits=${@}

for rice in ${rices[@]}; do
  for commit in ${commits[@]}; do
    git checkout $rice
    git cherry-pick $commit
    git push
  done
done
