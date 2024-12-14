import Notifyd from 'gi://AstalNotifd'

import { Gdk } from 'astal/gtk3'
import { execAsync, Variable } from 'astal'

import MenuMode from './MenuMode'

const notifyd = Notifyd.get_default()

const availableCommands = [
  { name: 'shutdown',     fn: () => execAsync(`systemctl poweroff`) },
  { name: 'restart',      fn: () => execAsync(`systemctl reboot`) },
  { name: 'suspend',      fn: () => execAsync(`bash -c 'systemctl suspend && hyprlock'`) },
  { name: 'logout',       fn: () => execAsync(`hyprctl dispatch exit`) },
  { name: 'clear-notif',  fn: () => notifyd.get_notifications().forEach(n => n.dismiss()) }
]

const queriedCommands = Variable(availableCommands)
const selectedCommand = Variable(queriedCommands.get()[0])
const selectedIndex = Variable(0)

export default function CommandMode(props: { gdkmonitor: Gdk.Monitor }) {
  const { gdkmonitor } = props

  return (
    <MenuMode
      gdkmonitor={gdkmonitor}
      mode='command'
      items={availableCommands}
      keys={['name']}
      queriedItems={queriedCommands}
      selectedItem={selectedCommand}
      selectedIndex={selectedIndex}
      onEnter={(selectedCommand) => {
        selectedCommand.fn()
      }}>
      {queriedCommands(commands => commands.map(command => (
        <box
          className={
            selectedCommand(selectedCmd =>
              selectedCmd.name === command.name
                ? 'selected item'
                : 'item'
            )
          }>
          <label
            className='name'
            label={command.name}
            truncate={true}
          />
        </box>
      )))}
    </MenuMode>
  )
}
