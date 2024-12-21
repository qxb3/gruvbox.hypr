import { Astal, Gdk, Gtk } from 'astal/gtk3'
import { exec, execAsync } from 'astal'

import { FloatingWindow } from '@widgets'
import { revealWallpapers } from './vars'

function getWallpapers() {
  return exec(`find -L ${HOME_DIR}/.config/swww -iname '*.png'`)
    .split('\n')
}

function Wallpapers() {
  const wallpapers = getWallpapers()

  return (
    <scrollable
      hexpand={true}
      vexpand={true}>
      <box
        className='content'
        vertical={true}
        spacing={12}>
        {wallpapers.map(wallpaper => (
          <button
            cursor='pointer'
            onClick={() => {
              execAsync(`swww img ${wallpaper}`)
              revealWallpapers.set(false)
            }}>
            <box
              className='wallpaper'
              css={`background-image: url("${wallpaper}");`}
            />
          </button>
        ))}
      </box>
    </scrollable>
  )
}

export default function(gdkmonitor: Gdk.Monitor) {
  <FloatingWindow
    className='wallpapers'
    title='Wallpapers'
    gdkmonitor={gdkmonitor}
    anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT}
    revealer={revealWallpapers}
    transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}>
    <Wallpapers />
  </FloatingWindow>
}
