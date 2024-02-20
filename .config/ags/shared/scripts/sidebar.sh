#!/bin/bash

STATES_PATH=$HOME/.config/ags/.states.json

case $1 in
  toggle)
    echo `cat $STATES_PATH | jq '.reveal_sidebar |= not | .'` > $STATES_PATH
  ;;

  open)
    echo `cat $STATES_PATH | jq '.reveal_sidebar = true'` > $STATES_PATH
  ;;

  close)
    echo `cat $STATES_PATH | jq '.reveal_sidebar = false'` > $STATES_PATH
  ;;
esac
