#!/usr/bin/gjs -m

import './globals'

import { App } from 'astal/gtk3'
import { compileScss } from './cssHotReload'

import StatusLine from '@windows/statusline/StatusLine'
import FileExplorer from '@windows/file_explorer/FileExplorer'

import requestHandler from './requestHandler'

App.start({
  css: compileScss(),
  main() {
    const mainMonitor = App.get_monitors().at(0)!

    StatusLine(mainMonitor)
    FileExplorer(mainMonitor)
  },
  requestHandler
})
