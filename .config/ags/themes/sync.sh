#!/bin/bash

theme=$1

if [ -z $theme ]; then
  echo "Theme is required"
  echo '$ sync.sh <theme>'

  exit 1
fi

WALLPAPERS_PATH="$HOME/.config/swww"
KITTY_PATH="$HOME/.config/kitty"
NVIM_PATH="$HOME/.config/nvim"

sync_wallpapers() {
  theme=$1
  if [ -z $theme ]; then
    echo 'sync_wallpapers <theme> is required'
    exit 1
  fi

  current_wall="$WALLPAPERS_PATH/current.walls"

  rm -rf $current_wall
  rm -rf ~/.config/swww/current.walls
  ln -sf "$WALLPAPERS_PATH/$theme" $current_wall

  # Since monitorFile cant work with symlinks
  # This is a shitty workaround to get updates
  # This just modify a file that change 0 to 1 and vice versa
  [ "$(cat "$WALLPAPERS_PATH/.changed")" = "0" ] && \
    echo "1" > "$WALLPAPERS_PATH/.changed" || \
    echo "0" > "$WALLPAPERS_PATH/.changed"

  swww img "$current_wall/current.set" \
    --transition-type "wipe" \
    --transition-duration 3
}

sync_kitty() {
  theme=$1
  if [ -z $theme ]; then
    echo 'sync_kitty <theme> is required'
    exit 1
  fi

  ln -sf "$KITTY_PATH/themes/$theme.conf" "$KITTY_PATH/themes/current.set"
  killall -USR1 kitty
}

sync_nvim() {
  theme=$1
  if [ -z $theme ]; then
    echo 'sync_nvim <theme> is required'
    exit 1
  fi

  ln -sf "$NVIM_PATH/lua/core/themes/$theme.lua" "$NVIM_PATH/lua/core/themes/current.lua"
  nvim --server /tmp/nvim --remote-send ':source ~/.config/nvim/lua/core/themes/current.lua<CR>'
}

sync_wallpapers $theme
sync_kitty $theme
sync_nvim $theme
