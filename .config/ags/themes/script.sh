#!/bin/bash

theme=$1
dev=$2

if [ -z "$theme" || -z "$dev" ]; then
  echo "Empty theme path"
  echo '$ script.sh <theme: .scss_path> <dev: true|false>'

  exit 1
fi

# Set the ags colorscheme
ln -sf "$theme" ~/.config/ags/themes/current.scss
if [ dev == "false" ]; then
  ags quit
  nohup ~/.config/ags/yume &> /dev/null & disown
fi
