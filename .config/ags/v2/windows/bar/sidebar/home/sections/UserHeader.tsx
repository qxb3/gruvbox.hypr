import { Astal, astalify, type ConstructProps, Gtk } from 'astal/gtk3'
import { exec, GObject } from 'astal'

class Popover extends astalify(Gtk.Popover) {
  static { GObject.registerClass(this) }

  constructor(props: ConstructProps<Gtk.Popover, Gtk.Popover.ConstructorProps>) {
    super(props as any)
  }
}

const username = exec(`whoami`)

function PowerControls() {

  return (
    <button
      className='power_button'
      halign={Gtk.Align.END}
      valign={Gtk.Align.CENTER}
      hexpand={true}
      setup={(button) => {
        <Popover
          setup={(popover) => {
            popover.set_relative_to(button)
            popover.set_position(Gtk.PositionType.LEFT)
          }}>
          <box
            className='power_menu'
            spacing={8}>
            <button>
              <label
                label='󰍃'
                css='font-size: 18px;'
              />
            </button>

            <button>
              <label
                label='󰤄'
                css='font-size: 18px;'
              />
            </button>

            <button>
              <label
                label='󰜉'
                css='font-size: 18px;'
              />
            </button>

            <button>
              <label
                label='󰐥'
                css='font-size: 18px;'
              />
            </button>
          </box>
        </Popover>
      }}>
      <label label='󰐥' />
    </button>
  )
}

export default function() {
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
