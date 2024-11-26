#!/usr/bin/gjs -m

import './globals'

import { App } from 'astal/gtk3'
import { compileScss } from './cssHotReload'

import Bar from '@windows/bar/Bar'
import NotificationPopups from '@windows/notificationPopups/NotificationPopups'

import requestHandler from './requestHandler'

App.start({
  css: compileScss(),
  main() {
    const mainMonitor = App.get_monitors().at(0)!

    Bar(mainMonitor)
    NotificationPopups(mainMonitor)
  },
  requestHandler
})
