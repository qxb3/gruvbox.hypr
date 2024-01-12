#!/bin/sh

function check_workspaces() {
  if [[ ${1:0:9} == "workspace" ]]; then
    active_workspace=`hyprctl activeworkspace -j | jq -r '.name'`
    persistent_workspaces='
      [
        {"name": "1", "active": false},
        {"name": "2", "active": false},
        {"name": "3", "active": false},
        {"name": "4", "active": false},
        {"name": "5", "active": false}
      ]
    '

    result=$( \
      echo "$persistent_workspaces" | \
      jq -c --arg active_workspace "$active_workspace" \
        '[.[] |
          if .name == ($active_workspace) then
            . + {active: true}
          else
            . + {active: false}
          end
        ] | sort_by(.name) | map(select(.name != "special"))' \
    )

    echo "$result"
  fi
}

check_workspaces "workspace"
socat -u "UNIX-CONNECT:/tmp/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock" - | while read -r line; do check_workspaces "$line"; done
