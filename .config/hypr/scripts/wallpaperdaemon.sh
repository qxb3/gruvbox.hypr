#!/bin/bash

swww query
if [ $? -eq 1 ]; then
  swww init
  swww img ~/.config/swww/current.set
fi
