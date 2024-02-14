#!/bin/bash

STATES_PATH=$HOME/.config/ags/.states.json

case $1 in
  toggle)
    bash ~/.config/ags/shared/scripts/applauncher.sh close
    bash ~/.config/ags/shared/scripts/commands.sh close
    echo `cat $STATES_PATH | jq -c '.reveal_sidebar |= not'` > $STATES_PATH
  ;;

  open)
    bash ~/.config/ags/shared/scripts/applauncher.sh close
    bash ~/.config/ags/shared/scripts/commands.sh close
    echo `cat $STATES_PATH | jq -c '.reveal_sidebar = true'` > $STATES_PATH
  ;;

  close)
    echo `cat $STATES_PATH | jq -c '.reveal_sidebar = false'` > $STATES_PATH
  ;;
esac
