#!/bin/bash

function window_state() {
  if [[ ${1:0:11} == "closewindow" ]]; then
    echo "tiling"
    return
  fi

  active_window=`hyprctl activewindow -j`
  is_floating=`echo "${active_window}" | jq '.floating'`

  if [[ "${is_floating}" == "true" ]]; then echo "floating"
  elif [[ "${is_floating}" == "false" ]]; then echo "tiling"
  fi
}

socat -u "UNIX-CONNECT:/tmp/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock" - | while read -r line; do window_state "$line"; done
