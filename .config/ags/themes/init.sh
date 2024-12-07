#!/bin/bash

# init.sh
# Initialize symlinks of theme defaults (nord) on LOCAL_STATE

WALLPAPERS_PATH="$HOME/.config/swww"
HYPR_THEME="$HOME/.config/hypr"
AGS_PATH="$HOME/.config/ags"
KITTY_PATH="$HOME/.config/kitty"
NVIM_PATH="$HOME/.config/nvim"
LOCAL_STATE="$HOME/.local/state/theme"

# Create $LOCAL_STATE if it doesnt exists
if [ ! -e "$LOCAL_STATE" ]; then
  mkdir "$LOCAL_STATE"

  echo "> Creating $LOCAL_STATE"
else
  echo "> Creating $LOCAL_STATE (Already Exists)"
fi

# Init Nord Wallpapers
if [[ ! -e "$LOCAL_STATE/wallpapers" && ! -e "$LOCAL_STATE/current_wallpaper" ]]; then
  ln -s "$WALLPAPERS_PATH/nord" "$LOCAL_STATE/wallpapers"
  ln -s "$WALLPAPERS_PATH/nord/outer_space.png" "$LOCAL_STATE/current_wallpaper"

  # Crop current_wallpaper
  magick "$LOCAL_STATE/current_wallpaper" \
    -gravity Center \
    -crop 1:1 \
    -resize 500x500 \
    +repage \
    "$LOCAL_STATE/current_wallpaper.crop"

  echo "0" > "$LOCAL_STATE/wallpapers_changed"

  echo "> Init Wallpapers"
else
  echo "> Init Wallpapers (Already Exists)"
fi

# Init Nord Hypr Theme
if [ ! -e "$LOCAL_STATE/hypr_theme.conf" ]; then
  ln -s "$HYPR_THEME/themes/nord.conf" "$LOCAL_STATE/hypr_theme.conf"

  echo "> Init Hypr"
else
  echo "> Init Hypr (Already Exists)"
fi

# Init Nord AGS Theme
if [ ! -e "$LOCAL_STATE/ags_theme.scss" ]; then
  ln -s "$AGS_PATH/themes/nord.scss" "$LOCAL_STATE/ags_theme.scss"

  echo "> Init AGS"
else
  echo "> Init AGS (Already Exists)"
fi

# Init Nord AGS no_music image
if [ ! -e "$LOCAL_STATE/no_music" ]; then
  ln -s "$AGS_PATH/assets/no_music/nord.png" "$LOCAL_STATE/no_music"

  echo "> Init AGS no_music image"
else
  echo "> Init AGS no_music image (Already Exists)"
fi

# Init Nord Kitty Theme
if [ ! -e "$LOCAL_STATE/kitty_theme.conf" ]; then
  ln -s "$KITTY_PATH/themes/nord.conf" "$LOCAL_STATE/kitty_theme.conf"
  killall -USR1 kitty

  echo "> Init Kitty"
else
  echo "> Init Kitty (Already Exists)"
fi

# Init Nord Neovim Theme
if [ ! -e "$LOCAL_STATE/nvim_theme.lua" ]; then
  ln -s "$NVIM_PATH/lua/core/themes/nord.lua" "$LOCAL_STATE/nvim_theme.lua"
  nvim \
    --server /tmp/nvim \
    --remote-send ":source $LOCAL_STATE/nvim_theme.lua<CR>"

  echo "> Init Neovim"
else
  echo "> Init Neovim (Already Exists)"
fi
