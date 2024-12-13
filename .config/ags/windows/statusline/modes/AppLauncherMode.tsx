import Applications from 'gi://AstalApps'

import { App, Astal, Gdk } from 'astal/gtk3'
import { Variable } from 'astal'

import { statusLineMode } from '../vars'

const MAX_RESULT = 15

const apps = new Applications.Apps({
  nameMultiplier: 2,
  entryMultiplier: 0,
  executableMultiplier: 2
})

const queriedApps = Variable<Applications.Application[]>(apps.fuzzy_query('').slice(0, MAX_RESULT))
const selectedApp = Variable<Applications.Application>(queriedApps.get()[0])
const selectedIndex = Variable(0)

function ApplicationsMenu(props: { gdkmonitor: Gdk.Monitor }) {
  const { gdkmonitor } = props

  return (
    <window
      name='applicationsMenu'
      namespace='astal_applications_menu'
      application={App}
      gdkmonitor={gdkmonitor}
      anchor={Astal.WindowAnchor.LEFT | Astal.WindowAnchor.BOTTOM}
      setup={(self) => App.add_window(self)}>
      <box
        className='applications_menu'
        vertical={true}>
        {queriedApps(apps => apps.map(app => (
          <box
            className={selectedApp(selectedApp =>
              selectedApp.get_name() === app.get_name()
                ? 'selected app'
                : 'app'
            )}
            spacing={4}>
            <icon
              icon={app.iconName}
              css='font-size: 18px;'
            />
            <label
              className='name'
              label={app.get_name()}
              truncate={true}
            />
          </box>
        )))}
      </box>
    </window>
  )
}

export default function AppLauncherMode(props: { gdkmonitor: Gdk.Monitor }) {
  const { gdkmonitor } = props

  return (
    <box
      name='appLauncher'
      className='app_launcher'>
      <label label=':' />
      <entry
        onChanged={({ text }) => {
          queriedApps.set(apps.fuzzy_query(text).slice(0, MAX_RESULT))
          selectedApp.set(queriedApps.get()[0])
          selectedIndex.set(0)
        }}
        onKeyPressEvent={(_, event) => {
          const keyval = event.get_keyval().pop()
          console.log(keyval)

          const queried = queriedApps.get()
          const index = selectedIndex.get()

          switch (keyval) {
            case Gdk.KEY_Escape:
              return statusLineMode.set('normal')
            case Gdk.KEY_Tab:
            case Gdk.KEY_Down:
              if (!queried) return

              if (index > queried.length) {
                selectedIndex.set(0)
                return
              }

              selectedIndex.set(index + 1)
              selectedApp.set(queried[selectedIndex.get()])
              break
            case Gdk.KEY_Up:
              if (!queried) return

              if (index > 0) {
                selectedIndex.set(index - 1)
                selectedApp.set(queried[selectedIndex.get()])
              }
              break
            case 65293: // Enter
              const app = selectedApp.get()

              if (app) {
                statusLineMode.set('normal')
                app.launch()
              }
              break
          }
        }}
        setup={(self) => {
          <ApplicationsMenu gdkmonitor={gdkmonitor} />
          App.toggle_window('applicationsMenu') // Close ApplicationsMenu at first

          self.hook(statusLineMode, () => {
            const mode = statusLineMode.get()
            App.toggle_window('applicationsMenu')

            if (mode !== 'appLauncher') {
              self.text = ''
              selectedApp.set(queriedApps.get()[0])
              selectedIndex.set(0)
              return
            }

            self.grab_focus()
          })
        }}
      />
    </box>
  )
}
