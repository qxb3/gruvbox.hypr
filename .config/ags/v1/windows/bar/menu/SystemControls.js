import BrightnessService from '../../../services/Brightness.js'

export default function() {
  const Brightness = Widget.Box({
    className: 'brightness slider_container',
    vertical: true,
    spacing: 8,
    children: [
      Widget.Slider({
        className: 'slider',
        value: BrightnessService.bind('screen-value'),
        onChange: ({ value }) => BrightnessService.screenValue = value,
        drawValue: false,
        vexpand: true,
        vertical: true,
        inverted: true
      }),
      Widget.Label({
        className: 'icon',
        label: ''
      })
    ]
  })

  return Widget.Box({
    className: 'system_controls menu',
    children: [
      Brightness
    ]
  })
}
