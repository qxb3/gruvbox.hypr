import { Gtk } from 'astal/gtk3'

import Home from './home/Home'
import AppLauncher from './appLauncher/AppLauncher'
import Wallpapers from './wallpapers/Wallpapers'
import Themes from './themes/Themes'

import {
  revealSideBar,
  sideBarShown,
  sideBarWidth
} from './vars'

export default function() {
  return (
    <revealer
      revealChild={revealSideBar()}
      transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
      transitionDuration={ANIMATION_SPEED}
      setup={(self) => {
        self.connect('size-allocate', () => {
          sideBarWidth.set(self.get_allocated_width())
        })
      }}>
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
