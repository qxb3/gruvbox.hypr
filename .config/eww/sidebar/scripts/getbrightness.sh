#!/bin/bash

while true; do
  brightnessctl -m -d intel_backlight | awk -F, '{print substr($4, 0, length($4)-1)}' | tr -d '%'
  sleep 1
done
