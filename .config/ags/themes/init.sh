#!/bin/bash

# init.sh
# Initialize symlinks of theme defaults (nord) on /tmp

WALLPAPERS_PATH="$HOME/.config/swww"
HYPR_THEME="$HOME/.config/hypr"
AGS_PATH="$HOME/.config/ags"
KITTY_PATH="$HOME/.config/kitty"
NVIM_PATH="$HOME/.config/nvim"
TMP="/tmp"

# Init Nord Wallpapers
if [[ ! -e "$TMP/wallpapers" && ! -e "$TMP/current_wallpaper" ]]; then
  ln -s "$WALLPAPERS_PATH/nord" "$TMP/wallpapers"
  ln -s "$WALLPAPERS_PATH/nord/outer_space.png" "$TMP/current_wallpaper"
  echo "0" > "$TMP/wallpapers_changed"

  echo "> Init Wallpapers"
else
  echo "> Init Wallpapers (Already Exists)"
fi

# Init Nord Hypr Theme
if [ ! -e "$TMP/hypr_theme.conf" ]; then
  ln -s "$HYPR_THEME/themes/nord.conf" "$TMP/hypr_theme.conf"

  echo "> Init Hypr"
else
  echo "> Init Hypr (Already Exists)"
fi

# Init Nord AGS Theme
if [ ! -e "$TMP/ags_theme.scss" ]; then
  ln -s "$AGS_PATH/themes/nord.scss" "$TMP/ags_theme.scss"

  echo "> Init AGS"
else
  echo "> Init AGS (Already Exists)"
fi

# Init Nord Kitty Theme
if [ ! -e "$TMP/kitty_theme.conf" ]; then
  ln -s "$KITTY_PATH/themes/nord.conf" "$TMP/kitty_theme.conf"
  killall -USR1 kitty

  echo "> Init Kitty"
else
  echo "> Init Kitty (Already Exists)"
fi

# Init Nord Neovim Theme
if [ ! -e "$TMP/nvim_theme.lua" ]; then
  ln -s "$NVIM_PATH/lua/core/themes/nord.lua" "$TMP/nvim_theme.lua"
  nvim \
    --server /tmp/nvim \
    --remote-send ":source $TMP/nvim_theme.lua<CR>"

  echo "> Init Neovim"
else
  echo "> Init Neovim (Already Exists)"
fi
