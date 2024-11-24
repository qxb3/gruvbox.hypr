#!/bin/bash

swww query
if [ $? -eq 1 ]; then
  swww-daemon --format xrgb &

  swww img ~/.config/swww/current.walls/current.set \
    --transition-type "wipe" \
    --transition-duration 2
fi
