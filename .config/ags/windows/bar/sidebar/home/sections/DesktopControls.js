import { musicVolume, setVolume } from '../../../../../shared/music.js'

const AudioService = await Service.import('audio')

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
    vpack: 'center',
    child: Widget.Stack({
      children: {
        wifi: Button('wifi', 'custom-svg-wifi', 'WIFI', true),
        wired: Button('wired', 'custom-svg-ethernet', 'WIRED', true)
      }
    })
  })

  const BluetoothButton = Button('bluetooth_button inactive', 'custom-svg-bluetooth-unavailable', 'BLUE')
  const VolumeButton = Button('volume_button', 'custom-svg-volume-mute', 'SILENT')
  const DNDButton = Button('dnd_button', 'custom-svg-bell-unavailable', 'DND')

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
