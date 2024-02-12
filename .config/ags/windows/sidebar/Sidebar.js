import {
  createTree
} from './fns.js'

import {
  fetch,
  stats,
  musicPlayer,
  desktopControls
} from './folders/imports.js'

function Sidebar() {
  const Header = Widget.Label({
    className: 'header',
    label: 'Sidebar'
  })

  const Path = Widget.Label({
    className: 'path',
    label: '~/.config/ags/windows/sidebar/',
    xalign: 0
  })

  const Tree = Widget.Box({
    className: 'tree',
    vertical: true,
    children: createTree({
      info: {
        type: 'dir',
        children: {
          fetch,
          stats
        },
      },
      desktop: {
        type: 'dir',
        children: {
          music_player: musicPlayer,
          desktop_controls: desktopControls
        }
      }
    })
  })

  const Calendar = Widget.Box({
    className: 'calendar',
    vexpand: true,
    vertical: true,
    vpack: 'end',
    spacing: 8,
    children: [
      Widget.Label({
        className: 'time',
        label: '12 : 04 AM'
      }),
      Widget.Label({
        className: 'day',
        label: 'MONDAY'
      })
    ]
  })

  return Widget.Box({
    className: 'sidebar',
    vertical: true,
    children: [
      Header,
      Path,
      Tree,
      Calendar
    ]
  })
}

export default Widget.Window({
  name: 'sidebar',
  layer: 'overlay',
  exclusivity: 'exclusive',
  anchor: ['left', 'top', 'bottom'],
  child: Sidebar()
})
