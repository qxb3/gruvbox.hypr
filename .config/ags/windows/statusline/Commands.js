import Fuse from '../../node_modules/fuse.js/dist/fuse.mjs'

import {
  commandsQuery,
  selectedCommand,
  queriedCommands,
  selectedCommandIndex
} from './misc/vars.js'

const Notifications = await Service.import('notifications')

const commands = [
  {
    name: 'shutdown',
    fn: () => console.log('shutdown')
  },
  {
    name: 'restart',
    fn: () => console.log('restart')
  },
  {
    name: 'suspend',
    fn: () => console.log('suspend')
  },
  {
    name: 'logout',
    fn: () => console.log('logout')
  },
  {
    name: 'notif-clear',
    fn: () => Notifications.clear()
  }
]

function CommandsList() {
  const fuse = new Fuse(commands, {
    useExtendedSearch: true,
    keys: ['name']
  })

  const Commands = Widget.Box({
    className: 'list',
    vertical: true,
    setup: (self) => self.hook(commandsQuery, () => {
      if (commandsQuery.value) {
        const result = fuse.search(commandsQuery.value)
        const cmds = []

        queriedCommands.value = result.map(r => r.item)
        selectedCommand.value = result[0].item
        selectedCommandIndex.value = 0

        for (let i = 0; i < result.length; i++) {
          const cmd = result[i].item

          cmds.push(
            Widget.Button({
              attribute: { cmd },
              cursor: 'pointer',
              sensitive: true,
              className: 'command',
              child: Widget.Label({
                label: cmd.name,
                xalign: 0
              }),
              setup: (self) => self.hook(selectedCommand, () => {
                if (!selectedCommand.value) return

                if (selectedCommand.value.name === self.attribute.cmd.name) self.className = 'command selected'
                else self.className = 'command'
              })
            })
          )
        }

        self.children = cmds
        self.show_all()
      }
    })
  })

  return Widget.Box({
    className: 'commands',
    vertical: true,
    children: [
      Commands
    ]
  })
}

export default Widget.Window({
  name: 'commands',
  layer: 'overlay',
  anchor: ['left', 'bottom'],
  child: CommandsList().hook(commandsQuery, () => {
    if (commandsQuery.value) App.openWindow('commands')
    else App.closeWindow('commands')
  })
})
