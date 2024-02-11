import App from 'resource:///com/github/Aylur/ags/app.js'
import Applications from 'resource:///com/github/Aylur/ags/service/applications.js'

import {
  queriedApps,
  query,
  selectedApp,
  selectedAppIndex
} from './states.js'

function AppsList() {
  return Widget.Box({
    className: 'apps',
    vertical: true
  })
    .hook(query, (self) => {
      if (query.value) {
        const apps = []
        const applications = Applications.query(query.value)
          .sort((a, b) => b.frequency - a.frequency)
          .slice(0, 30)

        queriedApps.value = applications
        selectedApp.value = applications[0]
        selectedAppIndex.value = 0

        for (let i = 0; i < applications.length; i++) {
          const app = applications[i]

          apps.push(
            Widget.Button({
              attribute: { app },
              cursor: 'pointer',
              sensitive: true,
              className: 'app',
              child: Widget.Label({
                label: app.name.toLowerCase().replace(' ', '-'),
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
        self.show_all()

        App.openWindow('apps')
      } else {
        App.closeWindow('apps')
      }
    })
}

export default Widget.Window({
  name: 'apps',
  layer: 'overlay',
  anchor: ['left', 'bottom'],
  child: AppsList()
})
