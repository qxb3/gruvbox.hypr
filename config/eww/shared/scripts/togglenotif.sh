#!/bin/bash

reveal_bar=`eww state -a | grep -oP 'reveal_bar: \K\w+'`
reveal_notif=`eww state -a | grep -oP 'reveal_notif: \K\w+'`

if [[ "${reveal_bar}" == "true" ]]; then
  if [[ "${reveal_notif}" == "true" ]]; then
    eww update reveal_notif=false
  else
    eww update reveal_notif=true
  fi
fi
