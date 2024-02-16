import { hyprSendMessage, getDate } from '../../shared/utils.js'
import { musicStatus, musicTitle } from '../../shared/music.js'

import { mode } from './misc/vars.js'
import { assignBatteryIcon } from './misc/fns.js'

import {
  AppLauncherMenu,
  AppLauncherInput,
  appLauncherInput
} from './modes/AppLauncher.js'

import {
  CommandLauncherMenu,
  CommandLauncherInput,
  commandLauncherInput
} from './modes/CommandLauncher.js'

const Hyprland = await Service.import('hyprland')
const Battery = await Service.import('battery')

function Divider(margin = '0 5px', divider = '') {
  return Widget.Label({
    className: 'divider',
    label: divider,
    css: `
      font-weight: 900;
      margin: ${margin};
    `
  })
}

function LeftSection() {
  // const W = Widget.Stack({
  //   className: 'window_state',
  //   children: {
  //     tiling: Widget.Label({
  //       className: 'floating',
  //       label: 'TILING'
  //     }),
  //     floating: Widget.Label({
  //       className: 'floating',
  //       label: 'FLOATING'
  //     })
  //   },
  //   setup: (self) => self.hook(Hyprland, () => {
  //     const isFloating = hyprSendMessage('activewindow').floating
  //     console.log(isFloating)
  //
  //     if (isFloating) self.shown = 'floating'
  //     else self.shown = 'tiling'
  //
  //     console.log(self.shown)
  //   }, 'event')
  // })

  const WindowState = Widget.Label({
    className: 'window_state tiling',
    label: 'TILING',
    setup: (self) => self.hook(Hyprland, () => {
      const isFloating = hyprSendMessage('activewindow').floating

      if (isFloating) {
        self.label = 'FLOATING'
        self.className = 'window_state floating'
      } else {
        self.label = 'TILING'
        self.className = 'window_state tiling'
      }
    }, 'event')
  })

  const ActiveWindow = Widget.Label({
    label: Hyprland.active.client.bind('class')
      .transform(window => {
        const activeWindow = hyprSendMessage('activewindow').class

        return !window
          ? activeWindow
            ? activeWindow
            : '~'
          : window
        }
      )
  })

  const WorkspaceIcon = Widget.Box({
    children: [
      Widget.Label('['),
      Widget.Label('+'),
      Widget.Label(']'),
    ]
  })

  const Music = Widget.Box({
    className: 'music',
    spacing: 2,
    children: [
      Widget.Label({
        label: musicTitle.bind()
          .transform(t => musicStatus.value === 'Stopped' ? '󰝛 No Music - Title' : `󰝚 Playing - ${t}`),
        maxWidthChars: 35,
        truncate: 'end'
      })
    ]
  })

  return Widget.Box({
    className: 'left',
    hexpand: true,
    homogeneous: false,
    spacing: 8,
    children: [
      WindowState,
      ActiveWindow,
      WorkspaceIcon,
      Divider('0'),
      Music
    ]
  })
}

function RightSection() {
  const RandomButton = Widget.Button({
    className: 'random_button',
    child: Widget.Label('')
  })

  const revealBatteryPercent = Variable(false)
  const BatteryIndicator = Widget.EventBox({
    className: 'battery',
    visible: Battery.bind('available'),
    onPrimaryClick: () => revealBatteryPercent.value = !revealBatteryPercent.value,
    child: Widget.Box({
      children: [
        Widget.Label({
          className: 'icon'
        }).hook(Battery, (self) =>
          self.label = assignBatteryIcon(Battery.charging, Battery.percent)
        ),
        Widget.Revealer({
          revealChild: revealBatteryPercent.bind(),
          transition: 'slide_right',
          transitionDuration: 100,
          sensitive: true,
          child: Widget.Label({
            className: 'percent',
            label: Battery.bind('percent')
              .transform(percent => `${percent}%`)
          })
        })
      ]
    })
  })

  const User = Widget.Label(Utils.exec('whoami'))

  const TimeIndicator = Widget.Label({
    className: 'time_indicator',
    label: getDate('time'),
    setup: (self) => self.poll(1000, () => self.label = getDate('time'))
  })

  const ModeIndicator = Widget.Stack({
    className: 'mode_indicator',
    transition: 'over_right_left',
    shown: mode.bind(),
    children: {
      normal: Widget.Label({
        className: 'workspace',
        label: Hyprland.active.workspace.bind('id').transform(id => `${id}:0`)
      }),
      appLauncher: Widget.Label({
        className: 'applauncher',
        label: mode.bind().transform(m => m === 'appLauncher' ? 'APP LAUNCHER' : '')
      }),
      commandLauncher: Widget.Label({
        className: 'commandlauncher',
        label: mode.bind().transform(m => m === 'commandLauncher' ? 'COMMANDS' : '')
      })
    }
  })

  return Widget.Box({
    className: 'right',
    homogeneous: false,
    children: [
      RandomButton,
      Divider(),
      BatteryIndicator,
      Widget.Box({
        visible: Battery.bind('available'),
        children: [ Divider('0 5px 0 0') ]
      }),
      User,

      Widget.Box({
        className: 'sections',
        children: [
          TimeIndicator,
          ModeIndicator
        ]
      })
    ]
  })
}

function StatusLine() {
  // Add mode windows
  App.addWindow(AppLauncherMenu)
  App.addWindow(CommandLauncherMenu)

  return Widget.Box({
    className: 'line',
    children: [
      Widget.Stack({
        shown: mode.bind(),
        children: {
          normal: LeftSection(),
          appLauncher: AppLauncherInput(),
          commandLauncher: CommandLauncherInput()
        }
      }),
      RightSection()
    ]
  })
}

export default Widget.Window({
  name: 'line',
  layer: 'top',
  exclusivity: 'exclusive',
  anchor: ['left', 'right', 'bottom'],
  keymode: mode.bind().transform(m => m === 'normal' ? 'none' : 'exclusive'),
  child: StatusLine().on('key-press-event', (_, event) => {
    const key = event.get_keyval()[1]

    if (mode.value === 'appLauncher') appLauncherInput(key)
    if (mode.value === 'commandLauncher') commandLauncherInput(key)
  })
})
