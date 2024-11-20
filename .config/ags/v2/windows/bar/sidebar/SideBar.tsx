import { Gtk } from 'astal/gtk3'
import Home from './home/Home'

import { revealSideBar, sideBarShown } from './vars'

export default function() {
  return (
    <revealer
      revealChild={revealSideBar()}
      transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
      transitionDuration={300}>
      <stack
        shown={sideBarShown()}
        transitionType={Gtk.StackTransitionType.SLIDE_RIGHT}
        transitionDuration={300}>
        <Home />
      </stack>
    </revealer>
  )
}
