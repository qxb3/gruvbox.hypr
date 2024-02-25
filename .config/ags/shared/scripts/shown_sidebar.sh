#!/bin/bash

STATES_PATH=$HOME/.config/ags/.states.json

case $1 in
  home)
    if [ `cat $STATES_PATH | jq -r '.sidebar_shown'` == "home" ]; then
      echo `cat $STATES_PATH | jq '.sidebar_shown = "home"'` > $STATES_PATH
      exit 0
    fi

    echo `cat $STATES_PATH | jq '.sidebar_shown = "home"'` > $STATES_PATH
  ;;

  applauncher)
    if [ `cat $STATES_PATH | jq -r '.sidebar_shown'` == "applauncher" ]; then
      echo `cat $STATES_PATH | jq '.sidebar_shown = "home"'` > $STATES_PATH
      exit 0
    fi

    echo `cat $STATES_PATH | jq '.sidebar_shown = "applauncher"'` > $STATES_PATH
  ;;

  *)
    echo "Unknown action."
  ;;
esac
