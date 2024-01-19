#!/bin/bash

ags -r 'reveal_applauncher.setValue(!reveal_applauncher.getValue())'
eww update reveal_sidebar=false
eww update reveal_notif=false
