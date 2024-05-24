#!/bin/sh

function print_workspace() {
  workspaces=$1
  current_workspace=$2

  result=$( \
    echo "$workspaces" | \
    jq -c --arg active_workspace "$current_workspace" \
      '[.[] |
        if .name == ($active_workspace) then
          . + {active: true}
        else
          . + {active: false}
        end
      ] | sort_by(.name) | map(select(.name != "special"))' \
  )

  echo $result
}

function check_workspaces() {
  if [[ ${1:0:9} == "workspace" ]]; then
    active_workspace=`hyprctl activeworkspace -j | jq -r '.name'`
    persistent_workspaces='
      [
        {"name": "1", "text": "󰞷", "active": false},
        {"name": "2", "text": "󰈹", "active": false},
        {"name": "3", "text": "󰙯", "active": false},
        {"name": "4", "text": "󰓇", "active": false},
        {"name": "5", "text": "󰠱", "active": false}
      ]
    '

    print_workspace "$persistent_workspaces" "$active_workspace"
  fi
}

check_workspaces "workspace"
socat -u UNIX-CONNECT:$XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock - | while read -r line; do check_workspaces "$line"; done
