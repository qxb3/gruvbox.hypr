#!/bin/bash

function window_state() {
  if [[ ${1:33:34} == "0" ]]; then echo "tiling"
  elif [[ ${1:33:34} == "1" ]]; then echo "floating"
  fi
}

socat -u "UNIX-CONNECT:/tmp/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock" - | while read -r line; do window_state "$line"; done
