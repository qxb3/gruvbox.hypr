<<<<<<< Updated upstream
<<<<<<< Updated upstream
import Gdk from 'gi://Gdk'

import SideBar from './sidebar/SideBar.js'
import Menu from './menu/Menu.js'

import { sidebarShown } from '../../shared/vars.js'
import { musicPlayerName } from '../../shared/music.js'

const HyprlandService = await Service.import('hyprland')
const SystemTrayService = await Service.import('systemtray')

function Divider() {
  return Widget.Box({
    className: 'divider'
  })
}

=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
function StartSection() {
  return Widget.Box({
    className: 'start',
    hpack: 'start',
    children: [
      Widget.Label().poll(1000, (self) =>
        self.label = Utils.exec(`date +"%A %I:%M %p - %m/%d/%Y"`)
      )
    ]
  })
}

function EndSection() {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const MusicPlayer = Widget.Button({
    attribute: { menu: Menu('musicPlayer') },
    className: 'music_player_button',
    child: Widget.Label('󰓇'),
    onClicked: (self) => self.attribute.menu.toggle()
  })

  const AudioControlButton = Widget.Button({
    attribute: { menu: Menu('audio') },
    className: 'audio_control_button',
    child: Widget.Label('󰋎'),
    onClicked: (self) => self.attribute.menu.toggle()
  })

  const SystemControlButton = Widget.Button({
    attribute: { menu: Menu('system') },
    className: 'system_control_button',
    child: Widget.Label(''),
    onClicked: (self) => self.attribute.menu.toggle()
  })

  const ScreenShotButton = Widget.Button({
    className: 'screenshot_button',
    child: Widget.Label('󰄄'),
    onPrimaryClick: () => Utils.subprocess(
      ['bash', '-c', '~/.config/hypr/scripts/screenshot.sh p'],
      (output) => print(output)
    )
  })

  const TimeIndicator = Widget.Button({
    attribute: { menu: Menu('calendar') },
    className: 'time_indicator',
    hpack: 'center',
    child: Widget.Label().poll(1000, (self) =>
      self.label = Utils.exec(`date +'%H\n%M'`)
    ),
    onClicked: (self) => self.attribute.menu.toggle()
  })
=======
=======
>>>>>>> Stashed changes
  const SystemButton = Widget.Button()
  const NetworkButton = Widget.Button()
  const AudioButton = Widget.Button()
  const NotificationButton = Widget.Button()
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

  return Widget.Box({
    hpack: 'end',
    className: 'end',
    spacing: 8,
    children: [
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      Widget.Box({
        className: 'controls',
        hpack: 'center',
        vertical: true,
        children: [
          Widget.Revealer({
            revealChild: musicPlayerName.bind().as(name => name === 'spotify' ? true : false),
            transition: 'slide_up',
            child: MusicPlayer
          }),
          AudioControlButton,
          SystemControlButton,
          ScreenShotButton
        ]
      }),
      TimeIndicator
=======
=======
>>>>>>> Stashed changes
      SystemButton,
      NetworkButton,
      AudioButton,
      NotificationButton
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    ]
  })
}

function Bar() {
  return Widget.Box({
    className: 'bar',
    homogeneous: true,
    children: [
      StartSection(),
      EndSection()
    ]
  })
}

export default Widget.Window({
  name: 'bar',
  layer: 'top',
  exclusivity: 'exclusive',
  anchor: ['top', 'left', 'right'],
  child: Bar()
})
