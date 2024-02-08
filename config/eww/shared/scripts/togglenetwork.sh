#!/bin/bash

reveal_bar=`eww state -a | grep -oP 'reveal_bar: \K\w+'`
reveal_network=`eww state -a | grep -oP 'reveal_network: \K\w+'`

if [[ "${reveal_bar}" == "true" ]]; then
  if [ "${reveal_network}" == "true" ]; then
    eww update reveal_network=false
  else
    eww update reveal_notif=false
    eww update reveal_network=true
  fi
fi
