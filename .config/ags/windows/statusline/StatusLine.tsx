import Hyprland from 'gi://AstalHyprland'
import Battery from 'gi://AstalBattery'

import { App, Astal, Gdk, Gtk } from 'astal/gtk3'
import { bind, Variable } from 'astal'

import BatteryIcon from '@widgets/BatteryIcon'
import StatusLineDivider from '@widgets/StatusLineDivider'

import NormalMode from './modes/NormalMode'
import CommandMode from './modes/CommandMode'
import WallpapersMode from './modes/WallpapersMode'

import { statusLineMode } from './vars'
import AppLauncherMode from './modes/AppLauncherMode'

const hyprland = Hyprland.get_default()
const battery = Battery.get_default()

const time = Variable('')
  .poll(1000, `date "+%I : %M %p"`)


function RightSection() {
  return (
    <box className='right'>
      <label
        className='decoration'
        label=''
      />

      <StatusLineDivider />

      <box visible={bind(battery, 'isPresent')}>
        <box
          className='battery'
          halign={Gtk.Align.CENTER}
          spacing={8}>
          <BatteryIcon className='icon' />

          <label
            className='percentage'
            label={
              bind(battery, 'percentage')
              .as(percentage => `${Math.floor(percentage * 100)}%`)
            }
          />
        </box>

        <StatusLineDivider />
      </box>

      <label
        className='user'
        label={USER}
      />

      <label
        className='time_indicator'
        label={time()}
      />

      <stack
        className='mode_indicator'
        shown='workspace'
        transitionType={Gtk.StackTransitionType.OVER_RIGHT_LEFT}
        transitionDuration={ANIMATION_SPEED}>
        <label
          name='workspace'
          className='workspace'
          label={
            bind(hyprland, 'focusedWorkspace')
              .as(workspace => `${workspace.get_id()}:0`)
          }
        />
      </stack>
    </box>
  )
}

function StatusLine(props: { gdkmonitor: Gdk.Monitor }) {
  const { gdkmonitor } = props

  return (
    <box className='statusline'>
      <stack shown={statusLineMode()}>
        <NormalMode />
        <AppLauncherMode gdkmonitor={gdkmonitor} />
        <CommandMode gdkmonitor={gdkmonitor} />
        <WallpapersMode gdkmonitor={gdkmonitor} />
      </stack>

      <RightSection />
    </box>
  )
}

export default function(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      name='statusline'
      namespace='astal_statusline'
      application={App}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      layer={Astal.Layer.TOP}
      anchor={Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.BOTTOM}
      keymode={statusLineMode(mode =>
        mode === 'normal'
          ? Astal.Keymode.NONE
          : Astal.Keymode.EXCLUSIVE
      )}>
      <StatusLine gdkmonitor={gdkmonitor} />
    </window>
  )
}
