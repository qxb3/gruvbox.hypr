#!/bin/bash

eww update reveal_sidebar=false

# reveal_applauncher=`eww state -a | grep -oP 'reveal_applauncher: \K\w+'`
# if [[ $reveal_applauncher == "true" ]]; then
#   eww update reveal_applauncher=false
#
#   sleep 0.25
#   eww close app_launcher
# else
#   eww open app_launcher
#
#   sleep 0.25
#   eww update reveal_applauncher=true
# fi

eww open --toggle app_launcher
