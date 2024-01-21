#!/bin/bash

path="/usr/share/applications"
files=($(ls $path))
res=""

length=$(#files[@])
for ((i=0; i<$length; i++)); do
    echo "Index: $i, File: ${files[$i]}"
done
# for ((i=0; i<$length; i++)); do
#   echo $i
  # content=`cat $path/$file`
  # name=`echo "${content}" | grep -oP "\bName=\K.*"`
  # icon=`echo "${content}" | grep -oP "\bIcon=\K.*"`
  # exec=`echo "${content}" | grep -oP "\bExec=\K.*"`
  #
  # res+=`printf '{"name": "%s", "icon": "%s", "exec": "%s"},' $name $icon $exec`
# done

# echo "[${res}]"
