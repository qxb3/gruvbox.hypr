#!/bin/bash

# Close special workspace if open
special_open=`hyprctl monitors -j | jq ".[0].specialWorkspace.name" | grep "special"`
if [ ! -z $special_open ]; then
  hyprctl dispatch togglespecialworkspace
fi

# Close sidebar if open
reveal_sidebar=`eww state -a | grep -oP 'reveal_sidebar: \K\w+'`
if [ $reveal_sidebar == "true" ]; then
  eww update reveal_sidebar=false
fi

# Close notification if open
reveal_notif=`eww state -a | grep -oP 'reveal_notif: \K\w+'`
if [ $reveal_notif == "true" ]; then
  eww update reveal_notif=false
fi

# Close prompt if open
yesno_open=`eww active-windows | grep "yesno"`
if [ ! -z $yesno_open ]; then
  eww close yesno
fi

hyprctl dispatch workspace $1
