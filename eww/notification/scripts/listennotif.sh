#!/bin/bash

while true; do
  notifs=`dunstctl history | jq -c -r '.data'`
  echo $notifs

  sleep 1
done

# function handle() {
#   print_history
#
#   while read -r line; do
#     # A weird trick to only call print_history if there is new notif
#     if [[ ! -z `echo $line | grep "appname"` ]]; then
#       sleep 5
#       print_history
#     fi
#   done
# }

# killall dunst
# dunst -print | handle
