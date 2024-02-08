#!/bin/bash

reveal_bar=`eww state -a | grep -oP 'reveal_bar: \K\w+'`
if [[ "${reveal_bar}" == "true" ]]; then
  eww update reveal_bar=false
else
  eww update reveal_bar=true
fi

eww update reveal_sidebar=false
eww update reveal_notif=false
eww update reveal_network=false

eww open --toggle logout
