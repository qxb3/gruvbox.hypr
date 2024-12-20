import './globals'

import { App } from 'astal/gtk3'
import { compileScss } from './cssHotReload'

import TopBar from '@windows/top_bar/TopBar'
import SideBar from './windows/side_bar/SideBar'
import AppLauncher from './windows/app_launcher/AppLauncher'

import requestHandler from './requestHandler'
import Calendar from './windows/calendar/Calendar'

App.start({
  css: compileScss(),
  icons: `${SRC}/assets/icons`,
  main() {
    const mainMonitor = App
      .get_monitors()
      .at(0)!

    SideBar(mainMonitor)
    TopBar(mainMonitor)

    AppLauncher(mainMonitor)
    Calendar(mainMonitor)
  },
  requestHandler: requestHandler
})
