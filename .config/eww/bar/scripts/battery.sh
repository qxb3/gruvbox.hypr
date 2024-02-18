#!/bin/bash

command=$1

function assign_icon() {
  capacity=$1
  min=$2
  max=$3
  icon=$4

  if (( $capacity >= $min && $capacity <= $max )); then
    echo $icon
  fi
}

case $command in
  get)
    path="/sys/class/power_supply/BAT*"

    while true; do
      status=`cat ${path}/status`
      capacity=`cat ${path}/capacity`

      icon=""

      case $status in
        Charging|Full)
          if   (( $capacity >= 0  && $capacity <= 9   )); then icon="󰢟"
          elif (( $capacity >= 10 && $capacity <= 20  )); then icon="󰢜"
          elif (( $capacity >= 21 && $capacity <= 30  )); then icon="󰂆"
          elif (( $capacity >= 31 && $capacity <= 40  )); then icon="󰂇"
          elif (( $capacity >= 41 && $capacity <= 50  )); then icon="󰂈"
          elif (( $capacity >= 51 && $capacity <= 60  )); then icon="󰢝"
          elif (( $capacity >= 61 && $capacity <= 70  )); then icon="󰂉"
          elif (( $capacity >= 71 && $capacity <= 80  )); then icon="󰢞"
          elif (( $capacity >= 81 && $capacity <= 90  )); then icon="󰂊"
          elif (( $capacity >= 91 && $capacity <= 99  )); then icon="󰂋"
          elif (( $capacity >= 100                    )); then icon="󱟢"
          fi
        ;;

        Discharging)
          if   (( $capacity >= 0  && $capacity <= 9   )); then icon="󰂎"
          elif (( $capacity >= 10 && $capacity <= 20  )); then icon="󰁺"
          elif (( $capacity >= 21 && $capacity <= 30  )); then icon="󰁻"
          elif (( $capacity >= 31 && $capacity <= 40  )); then icon="󰁼"
          elif (( $capacity >= 41 && $capacity <= 50  )); then icon="󰁽"
          elif (( $capacity >= 51 && $capacity <= 60  )); then icon="󰁾"
          elif (( $capacity >= 61 && $capacity <= 70  )); then icon="󰁿"
          elif (( $capacity >= 71 && $capacity <= 80  )); then icon="󰂀"
          elif (( $capacity >= 81 && $capacity <= 90  )); then icon="󰂁"
          elif (( $capacity >= 91 && $capacity <= 99  )); then icon="󰂂"
          elif (( $capacity >= 100                    )); then icon="󰁹"
          fi
        ;;

        *)
          status="Removed"
          capacity="0"
          icon="󱟨"
        ;;
      esac

      echo '{"status": "", "capacity": "", "icon": ""}' | \
        jq -c --arg status "${status}" --arg capacity "${capacity}" --arg icon "${icon}" \
        '.status = $status | .capacity = $capacity | .icon = $icon'

      sleep 1
    done
  ;;
esac
