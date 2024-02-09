#!/bin/bash

reveal_desktop_clock=`eww state -a | grep -oP 'reveal_desktop_clock: \K\w+'`
if [[ "${reveal_desktop_clock}" == "true" ]]; then
  eww update reveal_desktop_clock=false
else
  eww update reveal_desktop_clock=true
fi
