import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js'
import Mpris from 'resource:///com/github/Aylur/ags/service/mpris.js'
import Widget from 'resource:///com/github/Aylur/ags/widget.js'
import Utils from 'resource:///com/github/Aylur/ags/utils.js'

import { hyprSendMessage, getDate } from '../shared/utils.js'

function Divider(margin = '5px', divider = '') {
  return Widget.Label({
    className: 'divider',
    label: divider,
    css: `
      font-weight: 900;
      margin: 0 ${margin};
    `
  })
}

function Left() {
  const WindowState = Widget.Label({
    className: 'window_state tiling',
    label: 'TILING',
    setup: (self) => self.hook(Hyprland, () => {
      const isFloating = hyprSendMessage('activewindow').floating

      if (isFloating) {
        self.label = 'FLOATING'
        self.className = 'window_state floating'
      } else {
        self.label = 'TILING'
        self.className = 'window_state tiling'
      }
    }, 'event')
  })

  const ActiveWindow = Widget.Label({
    label: Hyprland.active.client.bind('class')
      .transform(window => {
        const activeWindow = hyprSendMessage('activewindow').class

        return !window
          ? activeWindow
            ? activeWindow
            : '~'
          : window
        }
      )
  })

  const WorkspaceIcon = Widget.Box({
    children: [
      Widget.Label('['),
      Widget.Label('+'),
      Widget.Label(']'),
    ]
  })

  const Music = Widget.Box({
    spacing: 2,
    children: [
      Widget.Label({
        setup: (self) => self.hook(Mpris, () => {
          const spotifyPlayer = Mpris.players.find(player => player.name === 'spotify')
          if (!spotifyPlayer) {
            return self.label = `󰝛 No Music - Title`
          }

          spotifyPlayer.connect('changed', () => {
            self.label = `󰝚 Playing - ${spotifyPlayer.trackTitle}`
          })
        })
      })
    ]
  })

  return Widget.Box({
    className: 'left',
    hexpand: true,
    homogeneous: false,
    spacing: 8,
    children: [
      WindowState,
      ActiveWindow,
      WorkspaceIcon,
      Divider('0'),
      Music
    ]
  })
}

function Right() {
  const NetworkButton = Widget.Button({
    className: 'network_button',
    cursor: 'pointer',
    child: Widget.Label('󰈀')
  })

  const NotificationButton = Widget.Button({
    className: 'notification_button',
    cursor: 'pointer',
    child: Widget.Label('󰂚')
  })

  const User = Widget.Label(Utils.exec('whoami'))

  const TimeIndicator = Widget.Label({
    className: 'time_indicator',
    label: getDate('time'),
    setup: (self) => self.poll(1000, () => self.label = getDate('time'))
  })

  const WorkspaceIndicator = Widget.Label({
    className: 'workspace_indicator',
    label: Hyprland.active.workspace.bind('id')
      .transform(id => `${id}:0`)
  })

  return Widget.Box({
    className: 'right',
    children: [
      NetworkButton,
      Divider(),
      NotificationButton,
      Divider(),
      User,

      Widget.Box({
        className: 'indicators',
        children: [
          TimeIndicator,
          WorkspaceIndicator
        ]
      })
    ]
  })
}

function Bar() {
  return Widget.Box({
    className: 'bar',
    children: [
      Left(),
      Right()
    ]
  })
}

export default Widget.Window({
  name: 'bar',
  layer: 'top',
  focusable: false,
  exclusivity: 'exclusive',
  anchor: ['left', 'right', 'bottom'],
  margins: [0],
  child: Bar()
})
