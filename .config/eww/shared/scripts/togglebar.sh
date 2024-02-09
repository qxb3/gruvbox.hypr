#!/bin/bash

reveal_bar=`eww state -a | grep -oP 'reveal_bar: \K\w+'`
if [[ "${reveal_bar}" == "true" ]]; then
  eww update reveal_bar=false
  eww update reveal_desktop_clock=true
else
  eww update reveal_bar=true
  eww update reveal_desktop_clock=false
fi

reveal_notif=`eww state -a | grep -oP 'reveal_notif: \K\w+'`
if [[ "${reveal_notif}" == "true" ]]; then
  eww update reveal_notif=false
fi
