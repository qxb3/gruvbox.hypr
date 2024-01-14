#!/bin/bash

reveal_notif=`eww state -a | grep -oP 'reveal_notif: \K\w+'`

if [[ $reveal_notif == "true" ]]; then
  eww update reveal_notif=false
else
  eww update reveal_notif=true
fi
