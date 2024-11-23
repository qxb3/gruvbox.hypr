#!/usr/bin/gjs -m

import './globals'

import { App } from 'astal/gtk3'

import Bar from '@windows/bar/Bar'
import NotificationPopups from '@windows/notificationPopups/NotificationPopups'
import style from './styles.scss'

import requestHandler from './requestHandler'

App.start({
  css: style,
  main() {
    const mainMonitor = App.get_monitors().at(0)!

    Bar(mainMonitor)
    NotificationPopups(mainMonitor)
  },
  requestHandler
})
