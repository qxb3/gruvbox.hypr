#!/bin/bash

theme=$1
dev=$2

if [[ -z $theme || -z $dev ]]; then
  echo "Empty theme path"
  echo '$ script.sh <theme: .scss_path> <dev: true|false>'

  exit 1
fi

restart_ags() {
  dev=$1
  if [ -z $dev ]; then
    echo 'restart_ags <dev> is required'
    exit 1
  fi

  if [ $dev == "false" ]; then
    ags quit
    nohup ags run &> /dev/null & disown
  fi
}

case $theme in
  gruvbox)
    # Set the wallpapers
    rm -rf ~/.config/swww/current.walls
    ln -sf ~/.config/swww/gruvbox ~/.config/swww/current.walls

    # Set the ags colorscheme
    ln -sf ~/.config/ags/themes/gruvbox.scss ~/.config/ags/themes/current.scss
    restart_ags $dev
  ;;
  oxocarbon)
    # Set the wallpapers
    rm -rf ~/.config/swww/current.walls
    ln -sf ~/.config/swww/oxocarbon ~/.config/swww/current.walls

    # Set the ags colorscheme
    ln -sf ~/.config/ags/themes/oxocarbon.scss ~/.config/ags/themes/current.scss
    restart_ags $dev
  ;;
  nord)
    # Set the wallpapers
    rm -rf ~/.config/swww/current.walls
    ln -sf ~/.config/swww/nord ~/.config/swww/current.walls

    # Set the ags colorscheme
    ln -sf ~/.config/ags/themes/nord.scss ~/.config/ags/themes/current.scss
    restart_ags $dev
  ;;
esac
