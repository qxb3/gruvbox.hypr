#!/bin/sh

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <arg>"
    exit 1
fi

case $1 in
  get)
    has_no_player=`playerctl -p Spotube metadata`

    # Default output if there is no player running
    if [[ -z $has_no_player ]]; then
      defaut_json=`echo '
        {
          "status": "Paused",
          "title": "No Music",
          "album": "Album",
          "artist": "Artist",
          "thumbUrl": "",
          "thumb": "/home/qxb3/.cache/thumbnails/music-player/default-thumb.png"
        }' | jq -c`

      echo "$defaut_json"
    else
      json=`playerctl -p Spotube metadata --format '
        {
          "status": "{{ status }}",
          "title": "{{ title }}",
          "album": "{{ album }}",
          "artist": "{{ artist }}",
          "thumbUrl": "{{ mpris:artUrl }}",
          "thumb": "/home/qxb3/.cache/thumbnails/music-player/{{ title }}.png"
        }' | jq -c`

      title=`echo $json | jq -r '.title'`
      thumbUrl=`echo $json | jq -r '.thumbUrl'`

      # Only download the thumbnail if it did not exist yet
      if ! test -f "/home/qxb3/.cache/thumbnails/music-player/${title}.png"; then
        wget $thumbUrl -O "/home/qxb3/.cache/thumbnails/music-player/${title}.png" -q
      fi

      echo "$json"
    fi
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

  *)
    echo "Unknown command: $1"
    exit 1
  ;;
esac
