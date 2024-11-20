import { Gtk } from 'astal/gtk3'

import Home from './home/Home'
import AppLauncher from './appLauncher/AppLauncher'
import Wallpapers from './wallpapers/Wallpapers'

import {
  revealSideBar,
  sideBarShown
} from './vars'

export default function() {
  return (
    <revealer
      revealChild={revealSideBar()}
      transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
      transitionDuration={500}>
      <stack
        shown={sideBarShown()}
        transitionType={Gtk.StackTransitionType.SLIDE_RIGHT}
        transitionDuration={500}>
        <Home />
        <AppLauncher />
        <Wallpapers />
      </stack>
    </revealer>
  )
}
