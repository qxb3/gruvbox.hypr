#!/bin/bash

reveal_sidebar=`eww state -a | grep -oP 'reveal_sidebar: \K\w+'`

if [[ $reveal_sidebar == "true" ]]; then
  eww update reveal_sidebar=false
else
  eww update reveal_sidebar=true
fi
