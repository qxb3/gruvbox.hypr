import { App, Astal, Gtk, Gdk } from 'astal/gtk3'
import SideBarHome from './home/SideBarHome'

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
        transitionDuration={300}
        setup={(self) => {
          self.add_named(<SideBarHome />, 'home')
        }}>
      </stack>
    </revealer>
  )
}
