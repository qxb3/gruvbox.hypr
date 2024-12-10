import Hyprland from 'gi://AstalHyprland'
import Mpris from 'gi://AstalMpris'
import Battery from 'gi://AstalBattery'

import { App, Astal, Gdk, Gtk } from 'astal/gtk3'
import { bind, Binding, Variable } from 'astal'
import BatteryIcon from '@widgets/BatteryIcon'

const hyprland = Hyprland.get_default()
const spotify = Mpris.Player.new('spotify')
const battery = Battery.get_default()

const time = Variable('')
  .poll(1000, `date "+%I : %M %p"`)

function Divider(
  {
    divider = '',
    margin = 5 ,
    visible = true
  }:
  { divider?: string,
    margin?: number,
    visible?: boolean | Binding<boolean | undefined> | undefined  }
) {
  return (
    <label
      className='divider'
      label={divider}
      visible={visible}
      css={`
        font-weight: 900;
        margin: 0 ${margin}px;;
      `}
    />
  )
}

function LeftSection() {
  return (
    <box
      className='left'
      spacing={8}
      hexpand={true}>
      <stack
        className='window_state'
        transitionType={Gtk.StackTransitionType.OVER_RIGHT_LEFT}
        transitionDuration={ANIMATION_SPEED}
        setup={(self) => {
          self.hook(hyprland, 'event', () => {
            const isFloating = hyprland
              .get_focused_client()
              .get_floating()

            self.set_shown(
              !isFloating ? 'tiling' : 'floating'
            )
          })
        }}>
        <label
          name='tiling'
          className='tiling'
          label='TILING'
        />

        <label
          name='floating'
          className='floating'
          label='FLOATING'
        />
      </stack>

      <label
        className='active_window'
        setup={(self) => {
          self.hook(hyprland, 'event', () => {
            const focusedClient = hyprland.get_focused_client()

            self.set_label(
              focusedClient
                ? focusedClient.get_class()
                : '~'
            )
          })
        }}
      />

      <box className='decoration'>
        <label label='[+]' />
      </box>

      <Divider />

      {bind(spotify, 'available').as(musicAvailable =>
        !musicAvailable
          ? (
              <label
                className='music_indicator'
                label='󰝛 No Music - Title'
              />
            )
          : (
              <label
                className='music_indicator'
                label={
                  bind(spotify, 'title')
                    .as(title => `󰝚 Playing - ${title}`)
                }
              />
            )
      )}
    </box>
  )
}

function RightSection() {
  return (
    <box className='right'>
      <label
        className='decoration'
        label=''
      />

      <Divider />

      <box
        className='battery'
        visible={bind(battery, 'isPresent')}
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

      <Divider visible={bind(battery, 'isPresent')} />

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

function StatusLine() {
  return (
    <box className='statusline'>
      <stack>
        <LeftSection />
      </stack>

      <RightSection />
    </box>
  )
}

export default function(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      name='bar'
      namespace='bar'
      application={App}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.BOTTOM}>
      <StatusLine />
    </window>
  )
}
