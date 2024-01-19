#!/bin/bash

while true; do
  notifs=`dunstctl history | jq -c -r '.data[0]'`
  echo $notifs

  sleep 1.5
done
