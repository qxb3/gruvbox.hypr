import { App, Astal, Gdk, Gtk } from 'astal/gtk3'

import { revealFileExplorer } from './vars'
import { createTree, FType } from './utils'

import fetch from './folders/fetch'
import stats from './folders/stats'
import musicPlayer from './folders/desktop/music_player'
import desktopControls from './folders/desktop/desktop_controls'
import notifications from './folders/desktop/notifications'

function FileExplorer() {
  const tree = createTree({
    type: FType.DIR,
    name: 'info',
    children: [
      fetch,
      stats,
      {
        type: FType.DIR,
        name: 'desktop',
        children: [
          musicPlayer,
          desktopControls,
          notifications
        ]
      }
    ]
  })

  return (
    <box
      className='file_explorer'
      vertical={true}>
      <label
        className='header'
        label='File Explorer'
        justify={Gtk.Justification.CENTER}
        hexpand={true}
      />

      <label
        className='path'
        label='~/.config/ags/windows/file_explorer'
        xalign={0}
      />

      <box
        className='tree'
        vertical={true}>
        {tree}
      </box>
    </box>
  )
}

export default function(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      name='sidebar'
      namespace='astal_file_explorer'
      application={App}
      gdkmonitor={gdkmonitor}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}>
      <revealer
        revealChild={revealFileExplorer()}
        transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
        transitionDuration={ANIMATION_SPEED}>
        <FileExplorer />
      </revealer>
    </window>
  )
}
