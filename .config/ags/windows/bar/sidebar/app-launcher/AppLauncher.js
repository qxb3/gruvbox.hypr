const query = Variable('')

function Header() {
  const Title = Widget.Label({
    className: 'title',
    label: ' Search Apps',
    xalign: 0
  })

  const Input = Widget.Overlay({
    className: 'input_container',
    passThrough: true,
    child: Widget.Entry({
      className: 'input',
      onChange: ({ text }) => query.value = text,
      setup: (self) => self.grab_focus()
    }),
    overlays: [
      Widget.Label({
        className: 'placeholder',
        xalign: 0,
        setup: (self) => self.hook(query, () => {
          if (query.value) self.label = ''
          else self.label = 'Search...'
        })
      })
    ]
  })

  return Widget.Box({
    className: 'header',
    vpack: 'start',
    vertical: true,
    spacing: 8,
    children: [
      Title,
      Input
    ]
  })
}

export default function() {

  return Widget.Box({
    className: 'app_launcher',
    spacing: 8,
    vertical: true,
    children: [
      Header()
    ]
  })
}
