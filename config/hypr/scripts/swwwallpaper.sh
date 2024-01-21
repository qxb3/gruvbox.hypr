#!/usr/bin/env sh

wallPath="${XDG_CONFIG_HOME:-$HOME/.config}/swww"

# nohup swww-daemon >&/dev/null &

swww query
if [ $? -eq 1 ]; then
  swww init
fi

# swww img "${wallPath}/current.set" \
#   --transition-type "wipe" \
#   --transition-duration 2
