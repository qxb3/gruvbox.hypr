import Notifyd from 'gi://AstalNotifd'

import { App, Astal, Gdk } from 'astal/gtk3'
import { execAsync, Variable } from 'astal'

import Fuse from 'fuse.js'
import { statusLineMode } from '../vars'

const notifyd = Notifyd.get_default()

const availableCommands = [
  { name: 'shutdown',     fn: () => execAsync(`systemctl poweroff`) },
  { name: 'restart',      fn: () => execAsync(`systemctl reboot`) },
  { name: 'suspend',      fn: () => execAsync(`bash -c 'systemctl suspend && hyprlock'`) },
  { name: 'logout',       fn: () => execAsync(`hyprctl dispatch exit`) },
  { name: 'clear-notif',  fn: () => notifyd.get_notifications().forEach(n => n.dismiss()) }
]

const fuse = new Fuse(availableCommands, {
  useExtendedSearch: true,
  includeMatches: true,
  keys: ['name']
})

const queriedCommands = Variable(availableCommands)
const selectedCommand = Variable(queriedCommands.get()[0])
const selectedIndex = Variable(0)

function CommandModeMenu(props: { gdkmonitor: Gdk.Monitor }) {
  const { gdkmonitor } = props

  return (
    <window
      name='commandMenu'
      namespace='astal_command_menu'
      application={App}
      gdkmonitor={gdkmonitor}
      anchor={Astal.WindowAnchor.LEFT | Astal.WindowAnchor.BOTTOM}
      setup={(self) => App.add_window(self)}>
      <box
        className='command_menu'
        vertical={true}>
        {queriedCommands(commands => commands.map(command => (
          <box
            className={
              selectedCommand(selectedCmd =>
                selectedCmd.name === command.name
                  ? 'selected command'
                  : 'command'
              )
            }>
            <label
              className='name'
              label={command.name}
              truncate={true}
            />
          </box>
        )))}
      </box>
    </window>
  )
}

export default function CommandMode(props: { gdkmonitor: Gdk.Monitor }) {
  const { gdkmonitor } = props

  return (
    <box
      name='command'
      className='command'>
      <label label=':' />
      <entry
        onChanged={({ text }) => {
          if (!text) queriedCommands.set(availableCommands)
          else queriedCommands.set(
            fuse.search(text)
              .map(cmd => cmd.item)
          )

          selectedCommand.set(queriedCommands.get()[0])
          selectedIndex.set(0)

        }}
        onKeyPressEvent={(_, event) => {
          const keyval = event.get_keyval().pop()

          const queried = queriedCommands.get()
          const index = selectedIndex.get()

          switch (keyval) {
            case Gdk.KEY_Escape:
              return statusLineMode.set('normal')
            case Gdk.KEY_Tab:
            case Gdk.KEY_Down:
              if (!queried) return

              if (index > queried.length) {
                selectedIndex.set(0)
                return
              }

              selectedIndex.set(index + 1)
              selectedCommand.set(queried[selectedIndex.get()])
              break
            case Gdk.KEY_Up:
              if (!queried) return

              if (index > 0) {
                selectedIndex.set(index - 1)
                selectedCommand.set(queried[selectedIndex.get()])
              }
              break
            case 65293: // Enter
              const app = selectedCommand.get()

              if (app) {
                statusLineMode.set('normal')
                app.fn()
              }

              break
          }
        }}
        setup={(self) => {
          const commandMenu = CommandModeMenu({ gdkmonitor })
          commandMenu.set_visible(false)

          self.hook(statusLineMode, () => {
            const mode = statusLineMode.get()

            if (mode !== 'command') {
              commandMenu.set_visible(false)

              self.text = ''

              selectedCommand.set(queriedCommands.get()[0])
              selectedIndex.set(0)

              return
            }

            commandMenu.set_visible(true)
            self.grab_focus()
          })
        }}
      />
    </box>
  )
}
