#!/usr/bin/env sh

function print_error() {
cat << "EOF"
    ./brightnesscontrol.sh <action>
    ...valid actions are...
        i -- <i>ncrease brightness [+5%]
        d -- <d>ecrease brightness [-5%]
EOF
}

function get_brightness {
  brightnessctl info | grep -oP "(?<=\()\d+(?=%)" | cat
}

function get_brightness_info(){
  brightnessctl info | awk -F "'" '/Device/ {print $2}'
}

case $1 in
  i) brightnessctl set +5% ;;
  d)
    if [[ $(get_brightness) -lt 5 ]] ; then
      brightnessctl set 1%
    else
      brightnessctl set 5%-
    fi
  ;;
  *) print_error ;;
esac

