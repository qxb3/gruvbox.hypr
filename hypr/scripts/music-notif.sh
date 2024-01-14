#!/bin/bash

function handle() {
  old_title=""

  while read -r title; do
    formated_title=`echo $title | tr -d "'/.,"`

    if [ ${title} != "${old_title}" ]; then
      sleep 1
      notify-send -a "Spotify" -i "$HOME/.cache/thumbnails/music-player/${formated_title}.png" -t 3000 "Playing - ${title}"

      old_title=$title
    fi
  done
}

playerctl -p spotify -F metadata --format '{{ title }}' | handle
