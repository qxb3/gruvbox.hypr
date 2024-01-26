#!/bin/bash

STATES_PATH='/home/qxb3/.config/ags/.states.json'
echo `cat $STATES_PATH | jq '.app_launcher |= not'` > $STATES_PATH

eww update reveal_sidebar=false
eww update reveal_notif=false
