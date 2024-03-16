#!/bin/bash

WALLPAPER_PATH=$HOME/.config/swww

if [ ! -d "$WALLPAPER_PATH/small" ]; then
  mkdir "$WALLPAPER_PATH/small"
fi

wallpapers=`find -L $WALLPAPER_PATH -type f -iname '*.png' -o -iname '*.jpg'`
for wallpaper in $wallpapers; do
  name=`basename ${wallpaper%.*}.jpg`
  convert $wallpaper "$WALLPAPER_PATH/small/$name"
  jpegoptim --max=15 "$WALLPAPER_PATH/small/$name"
done
