import BatteryService from 'gi://AstalBattery'

import { App, Astal, Gtk } from 'astal/gtk3'
import { bind } from 'astal'

import BatteryIcon from '../../../widgets/BatteryIcon'

import { revealBatteryMenu } from './vars'

const battery = BatteryService.get_default()

function toRelativeTime(seconds: number) {
  if (seconds < 60)
    return `${seconds}sec${seconds === 1 ? '' : 's'}`

  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}min${minutes === 1 ? '' : 's'}`
  }

  if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600)
    return `${hours}h`
  }

  const days = Math.floor(seconds / 86400)
  return `${days} day${days === 1 ? '' : 's'}`
}

function Divider() {
  return (
    <box
      className='divider'
      hexpand={true}
    />
  )
}

function BatteryPercentage({ charging }: { charging: boolean }) {
  return (
    <box
      className='battery_percentage'
      valign={Gtk.Align.START}
      spacing={12}>
      <BatteryIcon
        className={charging ? 'icon charging' : 'icon discharging'}
        charging={charging}
      />

      <label
        className='percentage'
        label={
          bind(battery, 'percentage').as(percentage =>
            `${(percentage * 100).toFixed(0)}%`
          )
        }
        xalign={0}
      />
    </box>
  )
}

function BatteryInfo({ charging }: { charging: boolean }) {
  return (
    <box
      className='battery_info'
      valign={Gtk.Align.CENTER}
      vertical={true}>

      <label
        className={charging ? 'state charging' : 'state discharging'}
        label={charging ? 'Charging' : 'Discharging'}
        xalign={0}
      />

      <label
        className='time_to_full'
        label={
          bind(battery, 'timeToFull').as(timeToFull =>
            `- Time To Full: ${toRelativeTime(timeToFull)}`
          )
        }
        xalign={0}
        visible={charging}
      />

      <label
        className='time_to_empty'
        label={
          bind(battery, 'timeToEmpty').as(timeToEmpty =>
            `- Time To Empty: ${toRelativeTime(timeToEmpty)}`
          )
        }
        xalign={0}
        visible={!charging}
      />
    </box>
  )
}

function BatteryMenu() {
  return (
    <box className='battery_menu menu'>
      {bind(battery, 'charging').as(charging => (
        <box
          vertical={true}>
          <BatteryPercentage charging={charging} />
          <Divider />
          <BatteryInfo charging={charging} />
        </box>
      ))}
    </box>
  )
}

export default function() {
  return (
    <window
      namespace='menu'
      layer={Astal.Layer.OVERLAY}
      anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
      setup={(self) => App.add_window(self)}>
      <revealer
        revealChild={revealBatteryMenu()}
        transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
        transitionDuration={500}>
        <BatteryMenu />
      </revealer>
    </window>
  )
}
