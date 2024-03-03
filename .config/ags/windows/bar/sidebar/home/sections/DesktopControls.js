import { musicVolume, setVolume } from '../../../../../shared/music.js'

const AudioService = await Service.import('audio')
const NetworkService = await Service.import('network')
const BluetoothService = await Service.import('bluetooth')
const NotificationsService = await Service.import('notifications')

function Button(className, svgIcon, name, active = false) {
  return Widget.Box({
    child: Widget.Button({
      className: className,
      child: Widget.Box({
        vertical: true,
        spacing: 6,
        children: [
          Widget.Icon({
            className: `icon ${!active ? 'inactive' : ''}`,
            icon: svgIcon,
            size: 32
          }),
          Widget.Label({
            className: 'name',
            label: name
          })
        ]
      })
    })
  })
}

export default function() {
  const NetworkButton = Widget.Button({
    className: 'network_button',
    cursor: 'pointer',
    vpack: 'center',
    child: Widget.Stack({
      shown: NetworkService.bind('primary'),
      children: {
        wifi: Button('wifi', 'custom-svg-wifi', 'WIFI', true),
        wired: Button('wired', 'custom-svg-ethernet', 'WIRED', true)
      }
    }),
    // onPrimaryClick: () => NetworkService.toggleWifi()
  })

  const BluetoothButton = Widget.Button({
    className: 'bluetooth_button',
    cursor: 'pointer',
    vpack: 'center',
    child: Widget.Stack({
      shown: BluetoothService.bind('enabled').as(on => on ? 'active' : 'inactive'),
      children: {
        active: Button('active', 'custom-svg-bluetooth', 'BLUE', true),
        inactive: Button('inactive', 'custom-svg-bluetooth-unavailable', 'BLUE', false)
      }
    }),
    onClicked: () => BluetoothService.toggle()
  })

  const isMuted = Variable(AudioService.speakers.every(speaker => !speaker.isMuted))
  const VolumeButton = Widget.Button({
    className: 'volume_button',
    cursor: 'pointer',
    vpack: 'center',
    child: Widget.Stack({
      shown: isMuted.bind().transform(muted => muted ? 'active' : 'inactive'),
      children: {
        active: Button('active', 'custom-svg-volume', 'SILENT', true),
        inactive: Button('inactive', 'custom-svg-volume-mute', 'SILENT', false)
      }
    }),
    onClicked: () => {
      AudioService.speakers.forEach(speaker => speaker.isMuted = !speaker.isMuted)
      isMuted.value = !isMuted.value
    }
  })

  const DNDButton = Widget.Button({
    className: 'dnd_button',
    cursor: 'pointer',
    vpack: 'center',
    child: Widget.Stack({
      shown: NotificationsService.bind('dnd').as(dnd => !dnd ? 'active' : 'inactive'),
      children: {
        active: Button('active', 'custom-svg-bell', 'DND', true),
        inactive: Button('inactive', 'custom-svg-bell-unavailable', 'DND', false)
      }
    }),
    onClicked: () => NotificationsService.dnd = !NotificationsService.dnd
  })

  const VolumeSlider = Widget.Box({
    className: 'volume_slider',
    spacing: 12,
    children: [
      Widget.Label({
        className: 'icon',
        label: '󰕾'
      }),
      Widget.Slider({
        className: 'slider',
        value: AudioService.speaker.bind('volume'),
        onChange: ({ value }) => AudioService.speaker.volume = value,
        drawValue: false,
        hexpand: true
      })
    ]
  })

  const MusicSlider = Widget.Box({
    className: 'music_slider',
    spacing: 12,
    children: [
      Widget.Label({
        className: 'icon',
        label: '󰎌'
      }),
      Widget.Slider({
        className: 'slider',
        min: 0,
        max: 1,
        value: musicVolume.bind(),
        onChange: ({ value }) => setVolume(value),
        drawValue: false,
        hexpand: true
      })
    ]
  })

  return Widget.Box({
    className: 'desktop_controls',
    vertical: true,
    spacing: 12,
    children: [
      Widget.Box({
        className: 'buttons',
        vpack: 'center',
        homogeneous: true,
        spacing: 24,
        children: [
          NetworkButton,
          BluetoothButton,
          VolumeButton,
          DNDButton
        ]
      }),
      Widget.Box({
        className: 'sliders',
        vertical: true,
        children: [
          VolumeSlider,
          MusicSlider
        ]
      })
    ]
  })
}
