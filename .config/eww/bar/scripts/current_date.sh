curr_time=`date +%s`
last_time=`eww get _last_current_date_visible`

if [ $(( $curr_time - $last_time )) -gt 5 ]; then
  eww update _current_date_visible=false
fi

date
