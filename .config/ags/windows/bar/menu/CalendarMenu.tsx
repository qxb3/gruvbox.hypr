import { App, Astal, Gtk } from 'astal/gtk3'
import { revealCalendarMenu } from './vars'

import Calendar from '@widgets/Calendar'

function CalendarMenu() {
  return (
    <box
      className='calendar_menu menu'
      hexpand={true}>
      <Calendar />
    </box>
  )
}

export default function() {
  return (
    <window
      namespace='menu'
      layer={Astal.Layer.OVERLAY}
      anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
      setup={(self) => App.add_window(self)}>
      <revealer
        revealChild={revealCalendarMenu()}
        transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
        transitionDuration={ANIMATION_SPEED}>
        <CalendarMenu />
      </revealer>
    </window>
  )
}
