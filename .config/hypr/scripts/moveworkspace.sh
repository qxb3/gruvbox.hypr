#!/bin/bash

# Close special workspace if open
special_open=`hyprctl monitors -j | jq ".[0].specialWorkspace.name" | grep "special"`
if [ ! -z $special_open ]; then
  hyprctl dispatch togglespecialworkspace
fi

hyprctl dispatch workspace $1

AGS_STATES=$HOME/.config/ags/.states.json
echo `cat $AGS_STATES | jq '.app_launcher = false'` > $AGS_STATES

eww update reveal_sidebar=false # Close sidebar
eww update reveal_notif=false # Close notification
eww update reveal_network=false # Close network
eww close yesno
