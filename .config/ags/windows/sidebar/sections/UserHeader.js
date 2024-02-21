const username = Utils.exec(`whoami`)

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

  const ShutdownButton = Widget.Button({
    className: 'shutdown_button',
    hpack: 'end',
    vpack: 'center',
    hexpand: true,
    child: Widget.Label('󰐥')
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
      ShutdownButton
    ]
  })
}
