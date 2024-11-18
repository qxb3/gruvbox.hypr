import { sidebarShown } from '../../../../shared/vars.js'

const ApplicationsService = await Service.import('applications')

const query = Variable('')
const queriedApps = Variable([])
const selectedApp = Variable()

function Header() {
  const Icon = Widget.Label({
    className: 'icon',
    label: '',
    xalign: 0
  })

  const Input = Widget.Overlay({
    className: 'input_container',
    passThrough: true,
    hexpand: true,
    child: Widget.Entry({
      className: 'input',
      onChange: ({ text }) => query.value = text,
      onAccept: () => {
        Utils.exec(`bash -c "${App.configDir}/shared/scripts/sidebar.sh close"`)
        Utils.exec(`bash -c "${App.configDir}/shared/scripts/sidebar.sh toggle-applauncher"`)

        selectedApp.value.launch()
      },
      setup: (self) => self.hook(sidebarShown, () => {
        if (sidebarShown.value === 'applauncher') {
          self.grab_focus()
        } else {
          self.text = ''

          selectedApp.value = queriedApps.value[0]
        }
      })
    }),
    overlays: [
      Widget.Label({
        className: 'placeholder',
        xalign: 0,
        setup: (self) => self.hook(query, () => {
          if (query.value) self.label = ''
          else self.label = 'Search Apps...'
        })
      })
    ]
  })

  return Widget.Box({
    className: 'header',
    vpack: 'start',
    spacing: 16,
    children: [
      Icon,
      Input
    ]
  })
}

function Application(app) {
  return Widget.Button({
    className: 'app',
    child: Widget.Box({
      spacing: 8,
      children: [
        Widget.Icon({
          icon: app.iconName || '',
          size: 32
        }),
        Widget.Label(app.name)
      ]
    }),
    onClicked: () => {
      Utils.exec(`bash -c "${App.configDir}/shared/scripts/sidebar.sh close"`)
      Utils.exec(`bash -c "${App.configDir}/shared/scripts/sidebar.sh toggle-applauncher"`)

      app.launch()
    },
    setup: (self) => self.connect('focus', () => {
      selectedApp.value = app
    })
  })
}

function AppsList() {
  return Widget.Scrollable({
    vexpand: true,
    child: Widget.Box({
      className: 'apps',
      vertical: true,
      spacing: 8,
      setup: (self) => self.hook(query, () => {
        const queriedApps = ApplicationsService.query(query.value)
        selectedApp.value = queriedApps[0]

        self.children = queriedApps.map(Application)
      })
    })
  })
}

export default function() {
  return Widget.Box({
    className: 'app_launcher',
    spacing: 8,
    vertical: true,
    children: [
      Header(),
      AppsList()
    ]
  })
}
