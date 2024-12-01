import './globals'
import './cssHotReload'

import { App, Astal } from 'astal/gtk3'

import SideBar from '@windows/sidebar/SideBar'
import Block from '@windows/block/Block'

import style from './styles.scss'

App.start({
  css: style,
  main() {
    const mainMonitor = App.get_monitors().at(0)!

    SideBar(mainMonitor)

    Block({
      gdkmonitor: mainMonitor,
      anchor: Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.TOP
    })

    Block({
      gdkmonitor: mainMonitor,
      anchor: Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.BOTTOM
    })

    Block({
      gdkmonitor: mainMonitor,
      anchor: Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.RIGHT
    })
  },
})
