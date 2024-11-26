#!/bin/bash

swww query
if [ $? -eq 1 ]; then
  swww-daemon --format xrgb &

  swww img /tmp/current_wallpaper \
    --transition-type "wipe" \
    --transition-duration 3
fi
