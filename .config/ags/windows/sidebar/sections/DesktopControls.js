function Button(className, svgIcon, name, active = false) {
  return Widget.Button({
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

  return Widget.Box({
    className: 'desktop_controls',
    vpack: 'center',
    spacing: 24,
    children: [
      NetworkButton,
      BluetoothButton,
      VolumeButton,
      DNDButton
    ]
  })
}
