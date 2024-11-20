import AppsService from 'gi://AstalApps'

import { Gtk } from 'astal/gtk3'
import { Variable } from 'astal'

import {
  revealSideBar,
  sideBarShown
} from '../vars'

const apps = new AppsService.Apps({
  nameMultiplier: 2,
  entryMultiplier: 0,
  executableMultiplier: 2
})

const query = Variable('')
const queriedApps = Variable<AppsService.Application[]>(apps.fuzzy_query(query.get()))
const selectedApp = Variable<AppsService.Application>(queriedApps.get()[0])

revealSideBar.subscribe((value) => {
  if (!value) {
    query.set('')
    queriedApps.set(apps.fuzzy_query(query.get()))
    selectedApp.set(queriedApps.get()[0])
  }
})

function launchApp(app: AppsService.Application) {
  revealSideBar.set(false)
  sideBarShown.set('home')

  app.launch()
}

function Header() {
  return (
    <box
      className='header'
      valign={Gtk.Align.START}
      spacing={16}>
      {/* Icon */}
      <label
        className='icon'
        label=''
        xalign={0}
      />

      {/* Input */}
      <overlay
        className='input_container'
        passThrough={true}
        hexpand={true}>
        <entry
          className='input'
          onChanged={({ text }) => {
            query.set(text)
            queriedApps.set(apps.fuzzy_query(text))
            selectedApp.set(queriedApps.get()[0])
          }}
          onActivate={() => launchApp(selectedApp.get())}
          setup={(self) => {
            self.hook(sideBarShown, () => {
              if (sideBarShown.get() === 'appLauncher' && !self.has_grab())
                return self.grab_focus()

              self.text = ''
            })
          }}
        />

        <label
          className='placeholder'
          label={
            query(query =>
              query.length <= 0
                ? 'Search Apps'
                : ''
            )
          }
          xalign={0}
        />
      </overlay>
    </box>
  )
}

function App(app: AppsService.Application) {
  return (
    <button
      className={
        selectedApp(selectedApp =>
          selectedApp.name === app.name
            ? 'app selected'
            : 'app'
        )
      }
      cursor='pointer'
      onClick={() => launchApp(app)}
      onKeyPressEvent={(_, event) => {
        // On Enter
        if (event.get_keycode().pop() === 36) {
          launchApp(app)
        }
      }}
      setup={(self) => {
        self.connect('focus-in-event', () => {
          selectedApp.set(app)
        })
      }}>
      <box spacing={8}>
        <icon
          icon={app.iconName}
          css='font-size: 32px;'
        />

        <label label={app.name} />
      </box>
    </button>
  )
}

function Applications() {
  return (
    <scrollable vexpand={true}>
      <box
        className='apps'
        vertical={true}
        spacing={8}>
        {queriedApps(apps =>
          apps.map(app => App(app))
        )}
      </box>
    </scrollable>
  )
}

export default function() {
  return (
    <box
      name='appLauncher'
      className='sidebar_appLauncher'
      spacing={8}
      vertical={true}>
      <Header />
      <Applications />
    </box>
  )
}
