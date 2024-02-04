#!/bin/bash

command=$1

case "${command}" in
  primary)
    prev_event=""

    function get_primary() {
      ethernet_status=`nmcli device | awk '$2=="ethernet" {print $3}'`
      wifi_status=`nmcli device | awk '$2=="wifi" {print $3}'`
      primary=""

      if [ "${ethernet_status}" == "connected" ]; then primary="ethernet"
      elif [ "${wifi_status}" == "connected" ]; then primary="wifi"
      fi

      echo "${primary}"
    }

    function handle() {
      get_primary

      while read -r line; do
        event=`echo "${line}" | grep -oE "(connecting|connected|disconnected|unavailable)"`
        if [ -z "${event}" ]; then continue; fi

        get_primary
      done
    }

    nmcli monitor | handle
  ;;

  wifi)
    function all_wifi_networks() {
      nmcli -f 'BSSID,SSID,CHAN,RATE,SIGNAL,SECURITY' device wifi list --rescan no | awk 'NR > 1 {print}'
    }

    function get_wifi_network() {
      network=`all_wifi_networks | grep "${1}" -s`

      ICON='"icon": "%s"'
      BSSID='"bssid": "%s"'
      SSID='"ssid": "%s"'
      CHANNEL='"channel": "%s"'
      SPEED='"speed": "%s"'
      SIGNAL='"signal": "%s"'
      SECURITY='"security": "%s"'

      if [ -z "${network}" ]; then
        printf "{${ICON}, ${BSSID}, ${SSID}, ${CHANNEL}, ${SPEED}, ${SIGNAL}, ${SECURITY}}\n" \
          "--" "--" "Unknown" "0" "0" "0" "--"

        return 1
      fi

      bssid=`echo "${network}" | awk -F '[[:space:]][[:space:]]+' '{print $1}'`
      ssid=`echo "${network}" | awk -F '[[:space:]][[:space:]]+' '{print $2}'`
      channel=`echo "${network}" | awk -F '[[:space:]][[:space:]]+' '{print $3}'`
      speed=`echo "${network}" | awk -F '[[:space:]][[:space:]]+' '{print $4}'`
      signal=`echo "${network}" | awk -F '[[:space:]][[:space:]]+' '{print $5}'`
      security=`echo "${network}" | awk -F '[[:space:]][[:space:]]+' '{gsub(/^[ \t]+|[ \t]+$/, ""); print $6}'`
      icon=""

      if   [ "${signal}" -le 0                              ]; then icon="󰤯"
      elif [ "${signal}" -ge 10   ] && [ "${signal}" -le 30 ]; then icon="󰤟"
      elif [ "${signal}" -ge 31   ] && [ "${signal}" -le 60 ]; then icon="󰤢"
      elif [ "${signal}" -ge 61   ] && [ "${signal}" -le 99 ]; then icon="󰤥"
      elif [ "${signal}" -ge 100                            ]; then icon="󰤨"
      fi

      printf "{${ICON}, ${BSSID}, ${SSID}, ${CHANNEL}, ${SPEED}, ${SIGNAL}, ${SECURITY}}\n" \
        "$icon" "$bssid" "$ssid" "$channel" "$speed" "$signal" "$security"
      }

      function wifi_network() {
        if [ -p /dev/stdin ]; then
          while IFS= read -r bssid; do
            get_wifi_network $bssid
          done
        else
          get_wifi_network $1
        fi
      }

    wifi_connected=`nmcli device | awk '$2=="wifi" {print $4}' | wifi_network`
    printf '{"status": "fetching", "connected": %s, "networks": []}\n' \
      "${wifi_connected}"

    while true; do
      wifi_status=`nmcli device | awk '$2=="wifi" {print $3}'`
      wifi_connected=`nmcli device | awk '$2=="wifi" {print $4}' | wifi_network`
      wifi_networks=`all_wifi_networks | awk -F '[[:space:]][[:space:]]+' '{print $1}' | wifi_network | jq -s -r '. | map(@json) | join(", ")'`

      printf '{"status": "%s", "connected": %s, "networks": [%s]}\n' \
        "${wifi_status}" "${wifi_connected}" "${wifi_networks}"

      sleep 6
    done
  ;;

  scan)
    while true; do
      echo "yes"
      nmcli device wifi list --rescan yes &>/dev/null
      echo "no"

      sleep 20
    done
  ;;

  *)
    echo "Unknown Command"
  ;;
esac
