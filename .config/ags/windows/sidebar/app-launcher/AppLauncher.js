function Header() {
  const Title = Widget.Label({
    className: 'title',
    label: ' Search Apps'
  })

  return Widget.Box({
    className: 'header',
    vpack: 'start',
    children: [
      Title
    ]
  })
}

export default function() {
  const Input = Widget.Overlay({
    className: 'input_container',
    passThrough: true,
    child: Widget.Entry({
      className: 'input',
      setup: (self) => self.grab_focus()
    }),
    overlays: [
      Widget.Label({
        label: 'Spotify',
        xalign: 0
      })
    ]
  })

  return Widget.Box({
    className: 'app_launcher',
    spacing: 8,
    vertical: true,
    children: [
      Header(),
      Input
    ]
  })
}
