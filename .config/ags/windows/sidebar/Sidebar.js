import { state } from '../../shared/utils.js'
import { createTree } from './fns.js'

import {
  fetch,
  stats,
  musicPlayer,
  desktopControls,
  notifications
} from './folders/imports.js'

const revealSidebar = state('reveal_sidebar', false)

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
          desktop_controls: desktopControls,
          notifications
        }
      }
    })
  })

  return Widget.Box({
    className: 'sidebar',
    vertical: true,
    children: [
      Header,
      Path,
      Tree
    ]
  })
}

export default Widget.Window({
  name: 'sidebar',
  layer: 'overlay',
  anchor: ['left', 'top', 'bottom'],
  margins: [0, 0, 0, -1],
  child: Widget.Box({
    css: `padding: 0.1px;`,
    child: Widget.Revealer({
      revealChild: revealSidebar.bind(),
      transition: 'none',
      child: Sidebar()
    })
  })
})
