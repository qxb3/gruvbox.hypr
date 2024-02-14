#!/bin/bash

STATES_PATH=$HOME/.config/ags/.states.json

case $1 in
  toggle)
    bash ~/.config/ags/shared/scripts/sidebar.sh close
    echo `cat $STATES_PATH | jq -c '.reveal_applauncher |= not'` > $STATES_PATH
  ;;

  open)
    bash ~/.config/ags/shared/scripts/sidebar.sh close
    echo `cat $STATES_PATH | jq -c '.reveal_applauncher = true'` > $STATES_PATH
  ;;

  close)
    echo `cat $STATES_PATH | jq -c '.reveal_applauncher = false'` > $STATES_PATH
  ;;
esac
