#!/bin/bash

eww update reveal_sidebar=false
eww update reveal_notif=false

source $HOME/.config/eww/shared/scripts/togglebar.sh
eww open --toggle logout
