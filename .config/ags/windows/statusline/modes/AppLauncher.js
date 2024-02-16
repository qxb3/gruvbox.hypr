import Gdk from 'gi://Gdk'
import { mode } from '../misc/vars.js'

const Applications = await Service.import('applications')

const query = Variable('')
const queriedApps = Variable([])
const selectedApp = Variable()
const selectedIndex = Variable(0)

function launchApp() {
  mode.value = 'normal'

  if (!selectedApp.value) return
  selectedApp.value.launch()
}

function next() {
  if (!queriedApps.value) return

  if (selectedIndex.value < queriedApps.value.length - 1) {
    selectedIndex.value += 1
    selectedApp.value = queriedApps.value[selectedIndex.value]
  }
}

function prev() {
  if (!queriedApps.value) return

  if (selectedIndex.value > 0) {
    selectedIndex.value -= 1
    selectedApp.value = queriedApps.value[selectedIndex.value]
  }
}

export function appLauncherInput(key) {
  switch (key) {
    case Gdk.KEY_Escape:
      mode.value = 'normal'
      break
    case Gdk.KEY_Up:
      prev()
      break
    case Gdk.KEY_Tab:
    case Gdk.KEY_Down:
      next()
      break
  }
}

const AppLauncherMenu = Widget.Window({
  name: 'appLauncherMenu',
  layer: 'top',
  anchor: ['left', 'bottom'],
  child: Widget.Box({
    className: 'apps',
    vertical: true,
    setup: (self) => self.hook(query, () => {
      if (!query.value) return self.children = []

      const apps = []
      const installedApps = Applications.query(query.value)
        .slice(0, 30)

      queriedApps.value = installedApps
      selectedApp.value = installedApps[0]
      selectedIndex.value = 0

      for (let i = 0; i < installedApps.length; i++) {
        const app = installedApps[i]

        apps.push(
          Widget.Button({
            attribute: { app },
            className: 'app',
            child: Widget.Label({
              label: app.name.toLowerCase().replace(/ /g, '-'),
              xalign: 0
            }),
            setup: (self) => self.hook(selectedApp, () => {
              if (!selectedApp.value) return

              if (selectedApp.value.name === self.attribute.app.name) self.className = 'app selected'
              else self.className = 'app'
            })
          })
        )
      }

      self.children = apps
    })
  })
})

export function AppLauncherInput() {
  App.addWindow(AppLauncherMenu)

  return Widget.Box({
    children: [
      Widget.Label(':'),
      Widget.Entry({
        onChange: ({ text }) => query.value = text,
        onAccept: () => launchApp(),
        setup: (self) => self.hook(mode, () => {
          if (mode.value !== 'appLauncher') {
            App.closeWindow('appLauncherMenu')
            self.text = ''

            return
          }

          self.grab_focus()
          App.openWindow('appLauncherMenu')
        })
      })
    ]
  })
}
