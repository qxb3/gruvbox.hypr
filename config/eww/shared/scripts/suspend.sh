#!/bin/bash

active_windows=`eww active-windows`
logout_open=`echo $active_windows | grep "logout"`
sidebar_open=`echo $active_windows | grep "sidebar"`
yesno_open=`echo $active_windows | grep "yesno"`

# Close logout window if opened
if [[ ! -z $logout_open ]]; then
  eww close logout
fi

# Close sidebar window if opened
if [[ ! -z $sidebar_open ]]; then
  eww update reveal_sidebar=false
fi

# Close yesno prompt if opened
if [[ ! -z $yesno_open ]]; then
  eww close yesno
fi

systemctl suspend && swaylock --no-unlock-indicator
