#!/bin/bash

STATES_PATH=$HOME/.config/ags/.states.json

case $1 in
  toggle)
    echo `cat $STATES_PATH | jq '.reveal_sidebar |= not | .sidebar_shown = "home"'` > $STATES_PATH
  ;;

  open)
    if [ `cat $STATES_PATH | jq '.reveal_sidebar'` == "true" ]; then
      echo "Already opened."
      exit 1
    fi

    echo `cat $STATES_PATH | jq '.reveal_sidebar = true'` > $STATES_PATH
  ;;

  close)
    if [ `cat $STATES_PATH | jq '.reveal_sidebar'` == "false" ]; then
      echo "Already closed."
      exit 1
    fi

    echo `cat $STATES_PATH | jq '.reveal_sidebar = false'` > $STATES_PATH
  ;;

  toggle-applauncher)
    if [[ `cat $STATES_PATH | jq -r '.sidebar_shown'` == "applauncher" ]]; then
      echo `cat $STATES_PATH | jq '.sidebar_shown = "home"'` > $STATES_PATH

      exit 0
    fi

    echo `cat $STATES_PATH | jq '.sidebar_shown = "applauncher" | .reveal_sidebar = true'` > $STATES_PATH
  ;;

  toggle-wallpapers)
    if [[ `cat $STATES_PATH | jq -r '.sidebar_shown'` == "wallpapers" ]]; then
      echo `cat $STATES_PATH | jq '.sidebar_shown = "home"'` > $STATES_PATH

      exit 0
    fi

    echo `cat $STATES_PATH | jq '.sidebar_shown = "wallpapers" | .reveal_sidebar = true'` > $STATES_PATH
  ;;

  *)
    echo "Unknown action."
  ;;
esac
