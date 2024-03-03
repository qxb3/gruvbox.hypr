#!/bin/bash

STATES_PATH=$HOME/.config/ags/.states.json

case $1 in
  toggle)
    echo `cat $STATES_PATH | jq '.app_launcher |= not'` > $STATES_PATH

    eww update reveal_sidebar=false
    eww update reveal_notif=false
  ;;

  open)
    if [ `cat $STATES_PATH | jq '.app_launcher'` == "true" ]; then
      echo "Already opened."
      exit 1
    fi

    echo `cat $STATES_PATH | jq '.app_launcher = true'` > $STATES_PATH
  ;;

  close)
    if [ `cat $STATES_PATH | jq '.app_launcher'` == "false" ]; then
      echo "Already opened."
      exit 1
    fi

    echo `cat $STATES_PATH | jq '.app_launcher = false'` > $STATES_PATH
  ;;
esac
