import { Gtk } from 'astal/gtk3'

import Home from './home/Home'
import AppLauncher from './appLauncher/AppLauncher'
import Wallpapers from './wallpapers/Wallpapers'
import Themes from './themes/Themes'

import {
  revealSideBar,
  sideBarShown,
} from './vars'

export default function() {
  return (
    <revealer
      revealChild={revealSideBar()}
      transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
      transitionDuration={ANIMATION_SPEED}>
      <stack
        shown={sideBarShown()}
        transitionType={Gtk.StackTransitionType.SLIDE_RIGHT}
        transitionDuration={ANIMATION_SPEED}>
        <Home />
        <AppLauncher />
        <Wallpapers />
        <Themes />
      </stack>
    </revealer>
  )
}
