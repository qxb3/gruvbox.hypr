#!/bin/bash

current_date_visible=`eww get _current_date_visible`
curr_time=`date +%s`

if [ $current_date_visible == "true" ]; then
  eww update _current_date_visible=false
else
  eww update "_last_current_date_visible=$curr_time"
  eww update _current_date_visible=true
fi
