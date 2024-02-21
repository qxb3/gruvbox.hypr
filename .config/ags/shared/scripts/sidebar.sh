#!/bin/bash

STATES_PATH=$HOME/.config/ags/.states.json

case $1 in
  toggle)
    echo `cat $STATES_PATH | jq '.reveal_sidebar |= not'` > $STATES_PATH
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

  *)
    echo "Unknown action."
  ;;
esac
