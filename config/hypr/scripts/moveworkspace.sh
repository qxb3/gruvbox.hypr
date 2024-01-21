#!/bin/bash

hyprctl dispatch workspace $1

ags -r "reveal_applauncher.setValue(false)" # Close applauncher
eww update reveal_sidebar=false # Close sidebar
eww update reveal_notif=false # Close notification

# Close special workspace if open
special_open=`hyprctl monitors -j | jq ".[0].specialWorkspace.name" | grep "special"`
if [ ! -z $special_open ]; then
  hyprctl dispatch togglespecialworkspace
fi

# Close prompt if open
yesno_open=`eww active-windows | grep "yesno"`
if [ ! -z $yesno_open ]; then
  eww close yesno
fi
