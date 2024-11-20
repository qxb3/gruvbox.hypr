import { Gtk } from 'astal/gtk3'
import { exec, execAsync, Variable } from 'astal'

import { revealSideBar } from '../../vars'

const powerMenuShown = Variable('power_button')
const powerMenuTransitionType = Variable(Gtk.StackTransitionType.SLIDE_LEFT)

revealSideBar.subscribe((value) => {
  if (value) {
    powerMenuTransitionType.set(Gtk.StackTransitionType.SLIDE_RIGHT)
    powerMenuShown.set('power_button')
  }
})

function PowerControls() {
  return (
    <stack
      shown={powerMenuShown()}
      transitionType={powerMenuTransitionType()}
      transitionDuration={300}
      halign={Gtk.Align.END}>
      <button
        name='power_button'
        className='power_button'
        halign={Gtk.Align.END}
        valign={Gtk.Align.CENTER}
        hexpand={true}
        cursor='pointer'
        onClick={() => {
          powerMenuTransitionType.set(Gtk.StackTransitionType.SLIDE_LEFT)
          powerMenuShown.set('power_menu')
        }}>
        <label label='󰐥' />
      </button>

      <box
        name='power_menu'
        className='power_menu'
        spacing={8}
        vexpand={false}
        halign={Gtk.Align.END}
        valign={Gtk.Align.CENTER}>
        {/* Close Power Menu */}
        <button
          className='close'
          cursor='pointer'
          onClick={() => {
            powerMenuTransitionType.set(Gtk.StackTransitionType.SLIDE_RIGHT)
            powerMenuShown.set('power_button')
          }}
        />

        {/* Shutdown */}
        <button
          cursor='pointer'
          onClick={() => execAsync(`systemctl poweroff`)}>
          <icon
            icon='system-shutdown-symbolic'
            css='font-size: 20px;'
          />
        </button>

        {/* Reboot */}
        <button
          cursor='pointer'
          onClick={() => execAsync(`systemctl reboot`)}>
          <icon
            icon='view-refresh-symbolic'
            css='font-size: 18px;'
          />
        </button>

        {/* Lock */}
        <button
          cursor='pointer'
          onClick={() => {
            revealSideBar.set(false)
            powerMenuShown.set('power_menu')

            execAsync(`hyprlock`)
          }}>
          <icon
            icon='system-lock-screen-symbolic'
            css='font-size: 18px;'
          />
        </button>

        {/* Suspend */}
        <button
          cursor='pointer'
          onClick={() => {
            revealSideBar.set(false)
            powerMenuShown.set('power_menu')

            execAsync(`bash -c 'systemctl suspend && hyprlock'`)
          }}>
          <icon
            icon='weather-clear-night-symbolic'
            css='font-size: 18px;'
          />
        </button>

        {/* Exit Hyprland */}
        <button
          cursor='pointer'
          onClick={() => execAsync(`hyprctl dispatch exit`)}>
          <icon
            icon='application-exit-symbolic'
            css='font-size: 18px;'
          />
        </button>
      </box>
    </stack>
  )
}

export default function() {
  const username = exec(`whoami`)

  return (
    <box
      className='user_box'
      spacing={12}>
      {/* Face */}
      <box
        className='face'
        css={`background-image: url('/home/${username}/.face')`}>
      </box>

      {/* Details */}
      <box
        className='details'
        valign={Gtk.Align.CENTER}
        spacing={2}
        vertical={true}>
        {/* Username */}
        <label
          className='username'
          label={username}
          xalign={0} />

        {/* WM */}
        <label
          className='wm'
          label='HYPRLAND'
          xalign={0} />
      </box>

      <PowerControls />
    </box>
  )
}
