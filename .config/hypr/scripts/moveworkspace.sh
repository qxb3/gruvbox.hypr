#!/bin/bash

# Close special workspace if open
special_open=`hyprctl monitors -j | jq ".[0].specialWorkspace.name" | grep "special"`
if [ ! -z $special_open ]; then
  hyprctl dispatch togglespecialworkspace
fi

hyprctl dispatch workspace $1

bash ~/.config/ags/shared/scripts/applauncher.sh close
bash ~/.config/ags/shared/scripts/changemode.sh normal
bash ~/.config/ags/shared/scripts/wallpapers.sh close
