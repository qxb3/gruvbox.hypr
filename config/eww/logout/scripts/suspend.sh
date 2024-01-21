#!/bin/bash

active_windows=`eww active-windows`
logout_open=`echo $active_windows | grep "logout"`
sidebar_open=`echo $active_windows | grep "sidebar"`

# Close logout window if opened
if [[ ! -z logout_open ]]; then
  eww close logout
fi

# Close sidebar window if opened
if [[ ! -z logout_open ]]; then
  eww update reveal_sidebar=false
fi

systemctl suspend && swaylock --no-unlock-indicator
