#!/bin/sh

function active_window() {
  window=`hyprctl activewindow -j | jq -r '.initialClass'`

  active_workspace=`hyprctl monitors -j | jq '.[0].activeWorkspace.name'`
  icon=""
  if [[ $active_workspace == '"1"' ]]; then icon=""; fi
  if [[ $active_workspace == '"2"' ]]; then icon="󰈹"; fi
  if [[ $active_workspace == '"3"' ]]; then icon="󰙯"; fi
  if [[ $active_workspace == '"4"' ]]; then icon=""; fi
  if [[ $active_workspace == '"5"' ]]; then icon=""; fi

  if [[ $window != "null" ]]; then
    ICON='"icon": "%s"'
    WINDOW='"window": "%s"'

    printf "{${ICON}, ${WINDOW}}\n" "$icon" "$window"
  else
    ICON='"icon": "%s"'
    WINDOW='"window": "~"'

    printf "{${ICON}, ${WINDOW}}\n" "$icon"
  fi
}

active_window "activewindow"
socat -u "UNIX-CONNECT:/tmp/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock" - | while read -r line; do active_window "$line"; done
