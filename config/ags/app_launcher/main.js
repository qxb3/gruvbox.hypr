import Widget from 'resource:///com/github/Aylur/ags/widget.js'
import Applications from 'resource:///com/github/Aylur/ags/service/applications.js'
import Variable from 'resource:///com/github/Aylur/ags/variable.js'

import { state, debounce } from '../shared/utils.js'

globalThis.revealAppLauncher = state('app_launcher', false)
globalThis.selectedApp = Variable()

function launchApp(app) {
  revealAppLauncher.value = false
  app.launch()
}

function queryApps(q) {
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

  selectedApp.value = applications[0].attribute.app

  return rows
}

function Application(app) {
  return Widget.Button({
    className: 'application',
    hpack: 'fill',
    cursor: 'pointer',
    attribute: { app },
    onClicked: () => launchApp(app),
    setup: (self) => self.connect('focus', (widget) => selectedApp.value = widget.attribute.app),
    child: Widget.Box({
      vertical: true,
      spacing: 8,
      children: [
        Widget.Icon({
          className: 'icon',
          icon: app.iconName || ''
        }),
        Widget.Label({
          className: 'name',
          label: app.name,
          maxWidthChars: 12,
          justification: 'center',
          wrap: true
        })
      ]
    })
  })
}

function AppLauncher() {
  const query = Variable('')

  const Header = Widget.Box({
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
  })

  const AppsGrid = Widget.Box({
    vertical: true,
    spacing: 8,
    children: queryApps('')
  })

  const Apps = Widget.Scrollable({
    className: 'applications',
    hscroll: 'never',
    child: AppsGrid,
    setup: (self) => self.hook(revealAppLauncher, () => self.vfunc_scroll_child(14, false))
  })

  const Input = Widget.Box({
    spacing: 8,
    children: [
      Widget.Button({
        cursor: 'pointer',
        onClicked: () => launchApp(selectedApp.value),
        child: Widget.Icon({
          className: 'icon_input',
          setup: (self) => self.hook(selectedApp, () => self.icon = selectedApp.value.iconName)
        })
      }),
      Widget.Overlay({
        child: Widget.Label({
          className: 'input_placeholder',
          xalign: 0,
          setup: (self) => self.hook(query, () => {
            if (query.value.length > 0) self.label = ''
            else self.label = 'Search Apps...'
          })
        }),
        overlays: [
          Widget.Entry({
            className: 'input',
            placeholder_text: 'Search Apps...',
            hexpand: true,
            onAccept: () => launchApp(selectedApp.value),
            onChange: debounce({
              called: ({ text }) => query.value = text,
              fn: ({ text }) => AppsGrid.children = queryApps(text)
            }),
            setup: (self) => self.hook(revealAppLauncher, () => {
              if (revealAppLauncher.value) self.grab_focus()
              else self.text = ''
            })
          })
        ]
      }),
      Widget.Button({
        className: 'close',
        cursor: 'pointer',
        onClicked: () => revealAppLauncher.value = false,
        child: Widget.Label('󰅖')
      })
    ]
  })

  return Widget.Box({
    className: 'container',
    vertical: true,
    spacing: 16,
    children: [
      Header,
      Apps,
      Input
    ]
  })
}

export default Widget.Window({
  name: 'app_launcher',
  className: 'app_launcher',
  layer: 'overlay',
  anchor: ['bottom'],
  margins: [15, 0, 0, 0],
  focusable: revealAppLauncher.bind(),
  child: Widget.Box({
    css: `padding: 0.01px;`,
    children: [
      Widget.Revealer({
        reveal_child: revealAppLauncher.bind(),
        transition: 'slide_up',
        transition_duration: 250,
        child: AppLauncher(),
      })
    ]
  })
})
