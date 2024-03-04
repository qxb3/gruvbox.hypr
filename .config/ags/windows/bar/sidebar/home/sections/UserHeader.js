import Gtk from 'gi://Gtk'

const username = Utils.exec(`whoami`)

function ShutdownButton() {
  const PowerMenu = Widget.subclass(Gtk.Popover)({
    child: Widget.Box({
      className: 'power_menu',
      spacing: 8,
      children: [
        Widget.Button({
          child: Widget.Icon({
            icon: 'system-shutdown-symbolic',
            size: 18
          }),
          onPrimaryClick: () => Utils.subprocess(
            [`systemctl`, `poweroff`],
            () => {}
          )
        }),
        Widget.Button({
          child: Widget.Icon({
            icon: 'view-refresh-symbolic',
            size: 18
          }),
          onPrimaryClick: () => Utils.subprocess(
            [`systemctl`, `reboot`],
            () => {}
          )
        }),
        Widget.Button({
          child: Widget.Icon({
            icon: 'weather-clear-night-symbolic',
            size: 18
          }),
          onPrimaryClick: () => {
            PowerMenu.popdown()
            Utils.subprocess(
              [`bash`, `-c`, `systemctl suspend && swaylock`],
              () => {}
            )
          }
        }),
        Widget.Button({
          child: Widget.Icon({
            icon: 'application-exit-symbolic',
            size: 18
          }),
          onPrimaryClick: () => Utils.subprocess(
            [`hyprctl`, `dispatch`, `exit`, `0`],
            () => {}
          )
        })
      ]
    })
  })

  return Widget.Button({
    className: 'shutdown_button',
    hpack: 'end',
    vpack: 'center',
    hexpand: true,
    child: Widget.Label('󰐥'),
    onClicked: () => PowerMenu.popup(),
    setup: (self) => {
      PowerMenu.set_relative_to(self)
      PowerMenu.set_position(Gtk.PositionType.LEFT)
    }
  })
}

export default function() {
  const Face = Widget.Box({
    className: 'face',
    css: `background-image: url("/home/${username}/.face.icon")`
  })

  const Username = Widget.Label({
    className: 'username',
    label: username,
    xalign: 0
  })

  const WM = Widget.Label({
    className: 'wm',
    label: 'HYPRLAND',
    xalign: 0
  })

  return Widget.Box({
    className: 'user_box',
    spacing: 12,
    children: [
      Face,
      Widget.Box({
        className: 'details',
        vpack: 'center',
        spacing: 2,
        vertical: true,
        children: [
          Username,
          WM
        ]
      }),
      ShutdownButton()
    ]
  })
}
