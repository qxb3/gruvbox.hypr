#!/bin/bash

STATES_PATH=$HOME/.config/ags/.states.json

mode=$1
if [ -z $mode ]; then
  echo "Specify the mode"
  exit 1
fi

echo `cat $STATES_PATH | \
  jq -c --arg mode "${mode}" \
  '
    if .statusline_mode != ($mode) then
      .statusline_mode = $mode
    else
      .statusline_mode = "normal"
    end
  ' \
` > $STATES_PATH
