#!/bin/sh

if [ "$#" -lt 1 ] || [ "$#" -gt 2 ]; then
    echo "Usage: $0 <arg> <sub-arg>"
    exit 1
fi

case $1 in
  title)
    zscroll \
      -l 10 \
      --delay 0.1 \
      --match-command "playerctl status &>/dev/null" \
      --match-text "Playing" "--scroll 1" \
      --match-text "Paused" "--scroll 0" \
      --update-check true \
          'playerctl -p spotify metadata --format "{{ title }}"'
  ;;

  check-player)
    playerctl -p spotify status &>/dev/null
    has_player=$?

    if [[ $has_player -eq 1 ]]; then
      STATUS='"status": "Stopped"'
      TITLE='"title": "No Music"'
      ALBUM='"album": "Album"'
      ARTIST='"artist": "Artist"'
      VOLUME='"volume": 110'
      THUMB='"thumb": "/home/qxb3/.cache/thumbnails/music-player/default-thumb.png"'

      echo "{${STATUS}, ${TITLE}, ${ALBUM}, ${ARTIST}, ${VOLUME}, ${THUMB}}"
    else
      echo '{"yes": true}'
    fi
  ;;

  meta)
    function handle() {
      while read -r line; do
        title=`echo $line | jq -r '.title' | tr -d "'"`
        thumb=`echo $line | jq -r '.thumb'`

        # Only download the thumbnail if it did not exist yet
        if ! test -f "/home/qxb3/.cache/thumbnails/music-player/${title}.png"; then
          wget $thumb -O "/home/qxb3/.cache/thumbnails/music-player/${title}.png" -q
        fi

        cached_thumb="/home/qxb3/.cache/thumbnails/music-player/${title}.png"

        echo $line | jq -c --arg cached_thumb "$cached_thumb" '.thumb = $cached_thumb | .volume *= 110'
      done
    }

    STATUS='"status": "{{ status }}"'
    TITLE='"title": "{{ title }}"'
    ALBUM='"album": "{{ album }}"'
    ARTIST='"artist": "{{ artist }}"'
    VOLUME='"volume": {{ volume }}'
    THUMB='"thumb": "{{ mpris:artUrl }}"'

    playerctl -s -p spotify metadata --follow --format "{${STATUS}, ${TITLE}, ${ALBUM}, ${ARTIST}, ${VOLUME}, ${THUMB}}" | handle
  ;;

  prev)
    playerctl previous
    echo "prev"
  ;;

  play)
    playerctl play-pause
    echo "play"
  ;;

  next)
    playerctl next
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
