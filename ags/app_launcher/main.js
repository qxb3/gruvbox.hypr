import Widget from 'resource:///com/github/Aylur/ags/widget.js'
import Applications from 'resource:///com/github/Aylur/ags/service/applications.js'
import Variable from 'resource:///com/github/Aylur/ags/variable.js'

globalThis.reveal_applauncher = Variable(false)

function Application(app) {
  return Widget.Button({
    class_name: 'application',
    on_clicked: () => {
      reveal_applauncher.setValue(false)
      app.launch()
    },
    hpack: 'fill',
    child: Widget.Box({
      vertical: true,
      spacing: 8,
      children: [
        Widget.Icon({
          class_name: 'icon',
          icon: app.icon_name || ''
        }),
        Widget.Label({
          class_name: 'name',
          label: app.name,
          max_width_chars: 12,
          justification: 'center',
          wrap: true
        })
      ]
    })
  })
}

function AppLauncher() {
  function query(q) {
    const rowSize = 4
    const rows = []
    const applications = Applications.query(q)
      .sort((a, b) => a.frequency - b.frequency)
      .map(Application)

    for (let i = 0; i < applications.length; i += rowSize) {
      const rowApps = applications.slice(i, i + rowSize)

      for (let j = 0; j < rowApps.length; j++) {
        rows.push(Widget.Box({
          spacing: 8,
          homogeneous: true,
          children: rowApps
        }))
      }
    }

    return rows
  }

  const list = Widget.Box({
    vertical: true,
    spacing: 8,
    children: query('')
  })

  return Widget.Box({
    class_name: 'container',
    vertical: true,
    spacing: 16,
    children: [
      Widget.Scrollable({
        class_name: 'applications',
        hscroll: 'automatic',
        child: list
      }),

      Widget.Box({
        spacing: 8,
        children: [
          Widget.Label({
            class_name: 'icon_input',
            label: ''
          }),
          Widget.Entry({
            class_name: 'input',
            placeholder_text: 'Search Apps...',
            hexpand: true,
            on_change: ({ text }) => {
              list.children = query(text)
            },
            setup: (self) => self.hook(reveal_applauncher, () => {
              if (reveal_applauncher.getValue()) self.grab_focus()
              else self.text = ''
            })
          })
        ]
      })
    ]
  })
}

export default Widget.Window({
  name: 'app_launcher',
  class_name: 'app_launcher',
  layer: 'overlay',
  anchor: ['top'],
  margins: [15, 0, 0, 0],
  focusable: reveal_applauncher.bind(),
  child: Widget.Box({
    css: `padding: 0.01px;`,
    children: [
      Widget.Revealer({
        reveal_child: reveal_applauncher.bind(),
        transition: 'slide_down',
        transition_duration: 250,
        child: AppLauncher(),
      })
    ]
  })
})
