#!/bin/sh

function active_window() {
  if [[ ${1:0:12} == "activewindow" ]]; then
    window=`hyprctl activewindow -j | jq -r '.title'`

    active_workspace=`hyprctl activeworkspace -j | jq '.name'`
    icon=""
    if [[ $active_workspace == '"1"' ]]; then icon=""; fi
    if [[ $active_workspace == '"2"' ]]; then icon="󰈹"; fi
    if [[ $active_workspace == '"3"' ]]; then icon="󰙯"; fi
    if [[ $active_workspace == '"4"' ]]; then icon="󰓇"; fi
    if [[ $active_workspace == '"5"' ]]; then icon="󰇘"; fi

    if [[ $window != "null" ]]; then
      echo "$icon    $window"
    else
      echo "$icon    ~"
    fi
  fi
}

active_window "activewindow"
socat -u "UNIX-CONNECT:/tmp/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock" - | while read -r line; do active_window "$line"; done
