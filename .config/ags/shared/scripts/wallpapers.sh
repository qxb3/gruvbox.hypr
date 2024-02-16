#!/bin/bash

STATES_PATH=$HOME/.config/ags/.states.json

case $1 in
  toggle)
    bash ~/.config/ags/shared/scripts/sidebar.sh close
    bash ~/.config/ags/shared/scripts/changemode.sh normal

    echo `cat $STATES_PATH | jq -c '.reveal_wallpapers |= not'` > $STATES_PATH
  ;;

  open)
    bash ~/.config/ags/shared/scripts/sidebar.sh close
    bash ~/.config/ags/shared/scripts/changemode.sh normal

    echo `cat $STATES_PATH | jq -c '.reveal_wallpapers = true'` > $STATES_PATH
  ;;

  close)
    echo `cat $STATES_PATH | jq -c '.reveal_wallpapers = false'` > $STATES_PATH
  ;;
esac
