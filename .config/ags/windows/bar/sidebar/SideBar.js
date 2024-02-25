import Home from './home/Home.js'
import AppLauncher from './app-launcher/AppLauncher.js'

import { state } from '../../../shared/utils.js'

const revealSideBar = state('reveal_sidebar', false)
const shown = state('sidebar_shown', 'home')

function SideBar() {
  return Widget.Stack({
    transition: 'slide_right',
    transitionDuration: 300,
    shown: shown.bind(),
    children: {
      home: Home(),
      applauncher: AppLauncher()
    }
  })
}

export default function() {
  return Widget.Box({
    css: `
      background-color: #282828;
      padding: 0.01px;
    `,
    child: Widget.Revealer({
      revealChild: revealSideBar.bind(),
      transition: 'slide_right',
      transitionDuration: 300,
      child: SideBar()
    })
  })
}
