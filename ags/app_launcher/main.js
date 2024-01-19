import Widget from 'resource:///com/github/Aylur/ags/widget.js'
import Applications from 'resource:///com/github/Aylur/ags/service/applications.js'
import Variable from 'resource:///com/github/Aylur/ags/variable.js'

globalThis.reveal_applauncher = Variable(false)
globalThis.selectedApp = Variable()

function Application(app) {
  return Widget.Button({
    className: 'application',
    hpack: 'fill',
    cursor: 'pointer',
    attribute: { app },
    onClicked: () => {
      reveal_applauncher.setValue(false)
      app.launch()
    },
    setup: (self) => self.connect('focus', (widget) => {
      selectedApp.setValue(widget.attribute.app)
    }),
    child: Widget.Box({
      vertical: true,
      spacing: 8,
      children: [
        Widget.Icon({
          className: 'icon',
          icon: app.icon_name || ''
        }),
        Widget.Label({
          className: 'name',
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
      .sort((a, b) => b.frequency - a.frequency)
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

    selectedApp.setValue(applications[0].attribute.app)

    return rows
  }


  function debounce(fn, delay = 400) {
    let id

    return function() {
      const context = this
      const args = arguments

      clearTimeout(id)

      id = setTimeout(() => {
        fn.apply(context, args)
      }, delay)
    }
  }

  const List = Widget.Box({
    vertical: true,
    spacing: 8,
    children: query('')
  })

  return Widget.Box({
    className: 'container',
    vertical: true,
    spacing: 16,
    children: [
      Widget.Box({
        className: 'header',
        spacing: 8,
        vertical: true,
        children: [
          Widget.Box({
            spacing: 8,
            children: [
              Widget.Label({
                className: 'icon',
                label: '󰀻'
              }),
              Widget.Label({
                className: 'title',
                label: 'Applications'
              })
            ]
          }),
          Widget.Box({
            css: `border: solid @bgh 1px;`
          })
        ]
      }),

      Widget.Scrollable({
        className: 'applications',
        hscroll: 'never',
        child: List,
        setup: (self) => self.hook(reveal_applauncher, () => {
          self.vfunc_scroll_child(14, false)
        })
      }),

      Widget.Box({
        spacing: 8,
        children: [
          Widget.Icon({
            className: 'icon_input',
            setup: (self) => self.hook(selectedApp, () => {
              self.icon = selectedApp.getValue().icon_name
            })
          }),
          Widget.Entry({
            className: 'input',
            placeholder_text: 'Search Apps...',
            hexpand: true,
            onAccept: () => {
              reveal_applauncher.setValue(false)
              selectedApp.getValue().launch()
            },
            onChange: debounce(({ text }) => {
              List.children = query(text)
            }),
            setup: (self) => self.hook(reveal_applauncher, () => {
              if (reveal_applauncher.getValue()) self.grab_focus()
              else self.text = ''
            })
          }),
          Widget.Button({
            className: 'close',
            cursor: 'pointer',
            onClicked: () => reveal_applauncher.setValue(false),
            child: Widget.Label({
              label: '󰅖'
            })
          })
        ]
      })
    ]
  })
}

export default Widget.Window({
  name: 'app_launcher',
  className: 'app_launcher',
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
