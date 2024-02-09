#!/bin/bash

loc=`curl -sS "ipinfo.io?token=878fa5750052fa" | jq -r '.loc'`
lat=`echo $loc | cut -d ',' -f1`
long=`echo $loc | cut -d ',' -f2`

weather_api_url="https://api.open-meteo.com/v1/forecast?"
params="latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover"

while true; do
  weather=`curl -sS "${weather_api_url}${params}"`
  temparature=`echo $weather | jq -r '.current.temperature_2m | round'`
  weather_code=`echo $weather | jq -r '.current.weather_code'`

  status=""
  icon=""

  case $weather_code in
    0|1|2)       status="Clear"; icon="" ;;
    3)           status="Cloudy"; icon="󰅟" ;;
    45|48)       status="Foggy"; icon="󰖑" ;;
    80|81|82)    status="Shower"; icon="" ;;
    61|63|65)    status="Raining"; icon="" ;;
    95)          status="Storm"; icon="" ;;
  esac

  printf '{"status": "%s", "icon": "%s", "temp": "%s"}\n' $status $icon $temparature

  # 30 Min
  sleep 1800
done
