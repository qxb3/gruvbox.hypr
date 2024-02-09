#!/usr/bin/env sh

# set variables
ScrDir=`dirname "$(realpath "$0")"`
RofiConf="${XDG_CONFIG_HOME:-$HOME/.config}/rofi/wallpaperselect.rasi"
wallPath="${XDG_CONFIG_HOME:-$HOME/.config}/swww"

# scale for monitor x res
x_monres=$(hyprctl -j monitors | jq '.[] | select(.focused==true) | .width')
monitor_scale=$(hyprctl -j monitors | jq '.[] | select (.focused == true) | .scale' | sed 's/\.//')
x_monres=$(( x_monres * 17 / monitor_scale ))

# set rofi override
elem_border=$(( hypr_border * 3 ))
r_override="element{border-radius:${elem_border}px;} listview{columns:6;spacing:100px;} element{padding:0px;orientation:vertical;} element-icon{size:${x_monres}px;border-radius:0px;} element-text{padding:20px;}"

# launch rofi menu
RofiSel=$( find -L "${wallPath}" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -exec basename {} \; | sort | while read rfile
do
  echo -en "$rfile\x00icon\x1f${wallPath}/${rfile}\n"
done | rofi -dmenu -theme-str "${r_override}" -config "${RofiConf}" -select "${currentWall}")

# apply wallpaper
if [ ! -z "${RofiSel}" ] ; then
  selected="${wallPath}/${RofiSel}"

  swww img $selected \
    --transition-type "wipe" \
    --transition-duration 2

  rm "${wallPath}/current.set"
  rm "/usr/share/sddm/themes/corners/backgrounds/background.png"

  ln -s $selected "${wallPath}/current.set"
  ln -s $selected "/usr/share/sddm/themes/corners/backgrounds/background.png"

  dunstify "Changed Wallpaper to ${RofiSel}" -a "Wallpaper" -i "${wallPath}/${RofiSel}" -r 91190 -t 2200
fi
