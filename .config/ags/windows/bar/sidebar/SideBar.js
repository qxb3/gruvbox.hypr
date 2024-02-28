import Home from './home/Home.js'
import AppLauncher from './app-launcher/AppLauncher.js'
import Wallpapers from './wallpapers/Wallpapers.js'

import { revealSideBar, sidebarShown } from '../../../shared/vars.js'

function SideBar() {
  return Widget.Stack({
    transition: 'slide_right',
    transitionDuration: 300,
    shown: sidebarShown.bind(),
    children: {
      home: Home(),
      applauncher: AppLauncher(),
      wallpapers: Wallpapers()
    }
  })
}

export default function() {
  return Widget.Revealer({
    revealChild: revealSideBar.bind(),
    transition: 'slide_right',
    transitionDuration: 300,
    child: SideBar()
  })
}
