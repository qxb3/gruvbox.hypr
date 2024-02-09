#!/bin/sh

if [ "$#" -lt 1 ] || [ "$#" -gt 2 ]; then
    echo "Usage: $0 <arg> <sub-arg>"
    exit 1
fi

# Add more players in comma seperated (spotify,firefox)
PLAYER='spotify'

case $1 in
  title)
    function handle() {
      while read -r title; do
        zscroll -l 10 "echo ${title}"
      done
    }

    zscroll \
      -l 10 \
      --delay 0.3 \
      --match-command "playerctl -p ${PLAYER} status" \
      --match-text "Playing" "--scroll 1" \
      --match-text "Paused" "--scroll 0" \
      --update-check true \
          'playerctl -p spotify metadata --format "{{ title }}"'
  ;;

  check-player)
    while true; do
      playerctl -p "${PLAYER}" status &>/dev/null
      has_player=$?

      if [[ $has_player -eq 1 ]]; then
        STATUS='"status": "Stopped"'
        TITLE='"title": "No Music"'
        ALBUM='"album": "Album"'
        ARTIST='"artist": "Artist"'
        VOLUME='"volume": 0'
        THUMB='"thumb": ""'
        POSITION='"position": 0'
        LENGTH='"length": 0'

        echo "{${STATUS}, ${TITLE}, ${ALBUM}, ${ARTIST}, ${VOLUME}, ${POSITION}, ${LENGTH}, ${THUMB}}" | \
          jq -c --arg home $HOME '.thumb |= $home + "/.config/eww/sidebar/assets/no-music.png"'
      else
        echo '{"yes": true}'
      fi

      sleep 2.5
    done
  ;;

  meta)
    function handle() {
      while read -r line; do
        status=`echo $line | jq -r '.status'`
        title=`echo $line | jq -r '.title' | tr -d "'/.,"`
        thumb=`echo $line | jq -r '.thumb'`

        cached_thumb="$HOME/.cache/thumbnails/music-player/${title}.png"

        # Only download the thumbnail if it did not exist yet
        if ! test -f "$cached_thumb"; then
          wget "$thumb" -O "/tmp/${title}.png" -q
          mv "/tmp/${title}.png" "$cached_thumb"
        fi

        echo $line | jq -c --arg cached_thumb "$cached_thumb" '.thumb = $cached_thumb | .volume *= 110'
      done
    }

    STATUS='"status": "{{ status }}"'
    TITLE='"title": "{{ title }}"'
    ALBUM='"album": "{{ album }}"'
    ARTIST='"artist": "{{ artist }}"'
    VOLUME='"volume": {{ volume }}'
    POSITION='"position": {{ position }}'
    LENGTH='"length": {{ mpris:length }}'
    THUMB='"thumb": "{{ mpris:artUrl }}"'

    playerctl -s -p "${PLAYER}" metadata --follow \
      --format "{${STATUS}, ${TITLE}, ${ALBUM}, ${ARTIST}, ${VOLUME}, ${POSITION}, ${LENGTH}, ${THUMB}}" | handle
  ;;

  prev)
    playerctl -p "${PLAYER}" previous
    echo "prev"
  ;;

  play)
    playerctl -p "${PLAYER}" play-pause
    echo "play"
  ;;

  next)
    playerctl -p "${PLAYER}" next
    echo "next"
  ;;

  vol-set)
    if [[ -z $2 ]]; then
      echo "Usage: $0 vol-set <vol (0 - 100)>"
    else
      vol=$2
      new_vol=`echo "scale=1; ${vol} / 100" | bc`
      playerctl volume "${new_vol}"
    fi
  ;;

  *)
    echo "Unknown command: $1"
    exit 1
  ;;
esac
