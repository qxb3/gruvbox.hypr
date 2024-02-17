import Gdk from 'gi://Gdk'
import Fuse from '../../../node_modules/fuse.js/dist/fuse.mjs'

import { revealWallpapers } from '../../wallpapers/misc/vars.js'
import { mode } from '../misc/vars.js'

const Notifications = await Service.import('notifications')

const query = Variable('')
const queriedCommands = Variable([])
const selectedCommand = Variable()
const selectedIndex = Variable(0)

const availableCommands = [
  { name: 'shutdown', fn: () => Utils.exec(`systemctl poweroff`) },
  { name: 'restart', fn: () => Utils.exec(`systemctl reboot`) },
  { name: 'suspend', fn: () => Utils.exec(`bash -c 'systemctl suspend && swaylock'`) },
  { name: 'logout', fn: () => Utils.exec(`hyprctl dispatch exit 0`) },
  { name: 'notif-clear', fn: () => Notifications.clear() },
  { name: 'change-wallpaper', fn: () => revealWallpapers.value = true }
]

const fuse = new Fuse(availableCommands, {
  useExtendedSearch: true,
  includeMatches: true,
  keys: ['name']
})

function execCommand() {
  mode.value = 'normal'

  if (!selectedCommand.value) return
  selectedCommand.value.fn()
}

function next() {
  if (!queriedCommands.value) return

  if (selectedIndex.value < queriedCommands.value.length - 1) {
    selectedIndex.value += 1
    selectedCommand.value = queriedCommands.value[selectedIndex.value]
  }
}

function prev() {
  if (!queriedCommands.value) return

  if (selectedIndex.value > 0) {
    selectedIndex.value -= 1
    selectedCommand.value = queriedCommands.value[selectedIndex.value]
  }
}

export function commandLauncherInput(key) {
  switch (key) {
    case Gdk.KEY_Escape:
      mode.value = 'normal'
      break
    case Gdk.KEY_Up:
      prev()
      break
    case Gdk.KEY_Tab:
    case Gdk.KEY_Down:
      next()
      break
  }
}

const CommandLauncherMenu = Widget.Window({
  name: 'commandLauncherMenu',
  layer: 'top',
  anchor: ['left', 'bottom'],
  child: Widget.Box({
    className: 'commands',
    vertical: true,
    setup: (self) => self.hook(query, () => {
      if (!query.value) return self.children = []

      const commands = []
      const searchedCommands = fuse.search(query.value)
        .map(cmd => cmd.item)
        .slice(0, 30)

      queriedCommands.value = searchedCommands
      selectedCommand.value = searchedCommands[0]
      selectedIndex.value = 0

      for (let i = 0; i < searchedCommands.length; i++) {
        const command = searchedCommands[i]

        commands.push(
          Widget.Button({
            attribute: { command },
            className: 'command',
            child: Widget.Label({
              label: command.name.toLowerCase().replace(/ /g, '-'),
              xalign: 0
            }),
            setup: (self) => self.hook(selectedCommand, () => {
              if (!selectedCommand.value) return

              if (selectedCommand.value.name === self.attribute.command.name) self.className = 'command selected'
              else self.className = 'command'
            })
          })
        )
      }

      self.children = commands
    })
  })
})

export function CommandLauncherInput() {
  App.addWindow(CommandLauncherMenu)

  return Widget.Box({
    children: [
      Widget.Label(':'),
      Widget.Entry({
        onChange: ({ text }) => query.value = text,
        onAccept: () => execCommand(),
        setup: (self) => self.hook(mode, () => {
          if (mode.value !== 'commandLauncher') {
            App.closeWindow('commandLauncherMenu')
            self.text = ''

            return
          }

          self.grab_focus()
          App.openWindow('commandLauncherMenu')
        })
      })
    ]
  })
}
