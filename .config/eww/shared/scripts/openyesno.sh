#!/bin/bash

# pos: "center", "cursor"
# args: some args to pass in to the window

pos=$1
onyes=$2
onno=$3

if [[ -z $pos ]]; then pos="cursor"; fi

if [[ -z $onyes ]]; then
  echo "onyes cannot be empty"
  exit 1
fi

if [[ -z $onno ]]; then onno="eww close yesno"; fi

final_pos=""

if [[ $pos == "cursor" ]]; then
  cursor_pos=`hyprctl cursorpos`
  cursor_x=`echo $cursor_pos | cut -d ',' -f1`
  cursor_y=`echo $cursor_pos | cut -d ',' -f2 | cut -d ' ' -f2`

  final_pos="--arg x=$(( cursor_x + 30 )) --arg y=$(( cursor_y - 85 ))"
elif [[ $pos == "center" ]]; then
  final_pos="--arg x=0 --arg y=0"
fi

final_command="eww open yesno ${final_pos} --arg onyes='${onyes}' --arg onno='${onno}'"
eval $final_command
