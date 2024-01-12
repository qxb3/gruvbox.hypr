#!/bin/bash

# Function to get Intel GPU temperature from 'sensors'
get_intel_gpu_temperature() {
  local temperature
  temperature=$(sensors | grep "Package id 0" | awk '{print $4}' | sed 's/+//;s/°C//;s/\.0//')
  echo "$temperature"
}

# Function to define emoji based on temperature
get_temperature_emoji() {
  local temperature="$1"
  if [ "$temperature" -lt 60 ]; then
    echo "❄️"  # Ice emoji for less than 60°C
  else
    echo "🔥"  # Fire emoji for 60°C or higher
  fi
}

primary_gpu="Intel GPU"
intel_gpu=$(lspci -nn | grep -i "VGA compatible controller" | grep -i "Intel Corporation" | awk -F' ' '{print $1}')
if [ -n "$intel_gpu" ]; then
  temperature=$(get_intel_gpu_temperature)
  emoji=$(get_temperature_emoji "$temperature")
  # Print the formatted information in JSON
  echo "{\"text\":\"$temperature°C\", \"tooltip\":\"Primary GPU: $primary_gpu\n$emoji Temperature: $temperature°C\"}"
else
  primary_gpu="Not found"
  gpu_info=""
  # Print the formatted information in JSON
  echo "{\"text\":\"N/A\", \"tooltip\":\"Primary GPU: $primary_gpu\"}"
fi
