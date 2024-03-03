#!/bin/bash

function close_special_workspace() {
  special_open=`hyprctl monitors -j | jq ".[0].specialWorkspace.name" | grep "special"`
  if [ ! -z $special_open ]; then
    hyprctl dispatch togglespecialworkspace
  fi
}

function close_sidebar() {
  eww update reveal_sidebar=false
}

function close_network() {
  eww update reveal_network=false
}

function close_notification() {
  eww update reveal_notif=false
}

function close_logout() {
  eww close logout
}

function close_applauncher() {
  bash -c "~/.config/ags/shared/scripts/applauncher.sh close"
}

function control() {
  while read -r line; do
    # Changes workspace
    if [ ${line:0:9} == "workspace" ]; then
      close_special_workspace
      close_sidebar
      close_network
      close_notification
      close_logout
      close_applauncher
    fi

    # Toggle floating mode
    if [ ${line:0:18} == "changefloatingmode" ] && [ ${line:33:34} == "1" ]; then
      close_sidebar
      close_network
      close_notification
      close_applauncher
    fi

    # Opens up special workspace
    if [ ${line:0:22} == "activespecial>>special" ]; then
      close_sidebar
      close_network
      close_notification
      close_logout
      close_applauncher
    fi
  done
}

socat -u "UNIX-CONNECT:/tmp/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock" - | control
