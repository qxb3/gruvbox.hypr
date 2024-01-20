#!/bin/bash

ags -r 'revealAppLauncher.setValue(!revealAppLauncher.getValue())'
eww update reveal_sidebar=false
eww update reveal_notif=false
