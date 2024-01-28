#!/bin/bash

source $HOME/.config/eww/shared/scripts/togglebar.sh
eww update reveal_sidebar=false
eww update reveal_notif=false

eww open --toggle logout
