#!/bin/bash

function handle {
  if [[ ${1:0:13} == "activespecial" ]]; then
    if [[ ${1:15:7} == "special" ]]; then
      hyprctl keyword general:gaps_out 128
      hyprctl keyword general:gaps_in 24
    else
      hyprctl keyword general:gaps_out 12
      hyprctl keyword general:gaps_out 8
    fi
  fi
}

socat - "UNIX-CONNECT:/tmp/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock" | while read -r line; do handle "$line"; done
