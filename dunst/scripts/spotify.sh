#!/bin/bash

appname="dadada"
song=`playerctl -p spotify metadata --format '{{ title }}'`
formatted_title=`echo $song | tr -d "'/.,"`

cached_thumb="$HOME/.cache/thumbnails/music-player/${formatted_title}.png"
notify-send -t 5000 -a "Music" -i "${cached_thumb}" "󰝚 Playing Music - ${song}"
