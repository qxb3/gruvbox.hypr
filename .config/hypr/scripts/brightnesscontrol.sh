#!/usr/bin/env sh

ScrDir=`dirname "$(realpath "$0")"`

function print_error
{
cat << "EOF"
    ./brightnesscontrol.sh <action>
    ...valid actions are...
        i -- <i>ncrease brightness [+5%]
        d -- <d>ecrease brightness [-5%]
EOF
}

function send_notification {
    value=$1
    info=$2

    angle="$(((($value + 2) / 5) * 5))"
    ico="~/.config/dunst/icons/vol/vol-${angle}.svg"
    bar=$(seq -s "." $(($value / 15)) | sed 's/[0-9]//g')

    dunstify "t2" -i $ico -a "$value$bar" "$info" -r 91190 -t 800
}

function get_brightness {
    brightnessctl info | grep -oP "(?<=\()\d+(?=%)" | cat
}

function get_brightness_info(){
    brightnessctl info | awk -F "'" '/Device/ {print $2}'
}

case $1 in
i)  # increase the backlight by 5%
    brightnessctl set +5%
    send_notification $(get_brightness) $(get_brightness_info) ;;
d)  # decrease the backlight by 5%
    if [[ $(get_brightness) -lt 5 ]] ; then
        # avoid 0% brightness
        brightnessctl set 1%
    else
        # decrease the backlight by 5%
        brightnessctl set 5%-
    fi
    send_notification $(get_brightness) $(get_brightness_info) ;;
*)  # print error
    print_error ;;
esac

