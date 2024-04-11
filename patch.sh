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
    git cherry-pick $commit
  done
done
