import './globals'

import { App } from 'astal/gtk3'
import { compileScss } from './cssHotReload'

import TopBar from '@windows/top_bar/TopBar'
import SideBar from './windows/side_bar/SideBar'
import AppLauncher from './windows/app_launcher/AppLauncher'

import requestHandler from './requestHandler'
import Calendar from './windows/calendar/Calendar'
import Wallpapers from './windows/wallpapers/Wallpapers'
import MusicPlayer from './windows/music_player/MusicPlayer'

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
    Wallpapers(mainMonitor)
    MusicPlayer(mainMonitor)
  },
  requestHandler: requestHandler
})
