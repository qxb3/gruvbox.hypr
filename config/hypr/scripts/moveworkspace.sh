#!/bin/bash

hyprctl dispatch workspace $1

eww update reveal_sidebar=false # Close sidebar
eww update reveal_notif=false # Close notification
eww close yesno

ags -r "reveal_applauncher.setValue(false)" # Close applauncher

# Close special workspace if open
special_open=`hyprctl monitors -j | jq ".[0].specialWorkspace.name" | grep "special"`
if [ ! -z $special_open ]; then
  hyprctl dispatch togglespecialworkspace
fi
