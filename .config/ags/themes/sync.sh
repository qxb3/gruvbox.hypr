#!/bin/bash

# sync.sh
# Sync ricable things to the current theme

theme=$1

if [ -z $theme ]; then
  echo "Theme is required"
  echo '$ sync.sh <theme>'

  exit 1
fi

WALLPAPERS_PATH="$HOME/.config/swww"
HYPR_PATH="$HOME/.config/hypr"
KITTY_PATH="$HOME/.config/kitty"
NVIM_PATH="$HOME/.config/nvim"
LOCAL_STATE="$HOME/.local/state/theme"

sync_wallpapers() {
  theme=$1
  if [ -z $theme ]; then
    echo 'sync_wallpapers <theme> is required'
    exit 1
  fi

  current_wall="$LOCAL_STATE/wallpapers"

  rm -rf $current_wall
  ln -sf "$WALLPAPERS_PATH/$theme" "$LOCAL_STATE/wallpapers"
  ln -sf "$WALLPAPERS_PATH/$theme/default.png" "$LOCAL_STATE/current_wallpaper"

  # Since monitorFile cant work with symlinks
  # This is a shitty workaround to get updates
  # This just modify a file that change 0 to 1 and vice versa
  [ "$(cat "$LOCAL_STATE/wallpapers_changed")" = "0" ] && \
    echo "1" > "$LOCAL_STATE/wallpapers_changed" || \
    echo "0" > "$LOCAL_STATE/wallpapers_changed"

  swww img "$LOCAL_STATE/current_wallpaper" \
    --transition-type "wipe" \
    --transition-duration 3
}

sync_hypr() {
  theme=$1
  if [ -z $theme ]; then
    echo 'sync_hypr <theme> is required'
    exit 1
  fi

  ln -sf "$HYPR_PATH/themes/$theme.conf" "$LOCAL_STATE/hypr_theme.conf"
  hyprctl reload
}

sync_kitty() {
  theme=$1
  if [ -z $theme ]; then
    echo 'sync_kitty <theme> is required'
    exit 1
  fi

  ln -sf "$KITTY_PATH/themes/$theme.conf" "$LOCAL_STATE/kitty_theme.conf"
  killall -USR1 kitty
}

sync_nvim() {
  theme=$1
  if [ -z $theme ]; then
    echo 'sync_nvim <theme> is required'
    exit 1
  fi

  ln -sf "$NVIM_PATH/lua/core/themes/$theme.lua" "$LOCAL_STATE/nvim_theme.lua"
  nvim \
    --server /tmp/nvim \
    --remote-send ":source $LOCAL_STATE/nvim_theme.lua<CR>"
}

sync_wallpapers $theme
sync_hypr $theme
sync_kitty $theme
sync_nvim $theme
