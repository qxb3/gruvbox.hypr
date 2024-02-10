#!/bin/bash

case $1 in
  listen)
    function get_notifs() {
      dunstctl history | jq -c -r '.data[0]'
    }

    function handle() {
      get_notifs

      while read -r line; do
        event=`echo "${line}" | awk '{print $8}'`
        if [ "${event}" == "NotificationClosed" ] || [ "${event}" == "HistoryRm" ] || [ "${event}" == "HistoryClear" ]; then
          get_notifs
        fi
      done
    }

    dbus-monitor --profile "interface=org.freedesktop.Notifications" | handle
  ;;

  rm)
    if [ -z $2 ]; then
      echo "<id> needs to be passed in.";
      exit 1
    fi

    dunstctl history-rm $2

    dbus-send --session \
      --dest=org.freedesktop.Notifications \
      --type=method_call \
      --print-reply \
      /org/freedesktop/Notifications \
      org.freedesktop.Notifications.HistoryRm \
      string:"app" \
      uint32:0 \
      string:"" \
      string:"title" \
      string:"message" \
      array:string:"" \
      dict:string:string:"" \
      int32:5000 &2>/dev/null
  ;;

  clear)
    dunstctl history-clear

    dbus-send --session \
      --dest=org.freedesktop.Notifications \
      --type=method_call \
      --print-reply \
      /org/freedesktop/Notifications \
      org.freedesktop.Notifications.HistoryClear \
      string:"app" \
      uint32:0 \
      string:"" \
      string:"title" \
      string:"message" \
      array:string:"" \
      dict:string:string:"" \
      int32:5000
  ;;

  *)
    echo "Unknown Command."
  ;;
esac
