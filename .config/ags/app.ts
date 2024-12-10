#!/usr/bin/gjs -m

import './globals'

import { App } from 'astal/gtk3'
import { compileScss } from './cssHotReload'

import StatusLine from '@windows/statusline/StatusLine'

App.start({
  css: compileScss(),
  main() {
    const mainMonitor = App.get_monitors().at(0)!

    StatusLine(mainMonitor)
  },
})
