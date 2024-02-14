import {
  musicVolume,
  setVolume
} from '../../../shared/music.js'

const volume = Variable(0, {
  poll: [1000, `pamixer --get-volume`, vol => parseInt(vol)]
})

const brightness = Variable(0, {
  poll: [1000, `brightnessctl -m -d intel_backlight`, bright => parseInt(bright.split(',')[3].replace('%', ''))]
})

export default {
  type: 'dir',
  children: {
    volume: {
      type: 'widget',
      icon: '󰕾',
      widget: Widget.Box({
        homogeneous: false,
        children: [
          Widget.Label('['),
          Widget.Slider({
            drawValue: false,
            hexpand: true,
            value: volume.bind(),
            min: 0,
            max: 100,
            onChange: ({ value }) => Utils.exec(`pamixer --set-volume ${parseInt(value)}`)
          }),
          Widget.Label(']')
        ]
      })
    },
    music: {
      type: 'widget',
      icon: '󰝚',
      spacing: 2,
      widget: Widget.Box({
        homogeneous: false,
        children: [
          Widget.Label('['),
          Widget.Slider({
            drawValue: false,
            hexpand: true,
            value: musicVolume.bind(),
            min: 0,
            max: 1,
            onChange: ({ value }) => setVolume(value)
          }),
          Widget.Label(']')
        ]
      })
    },
    bright: {
      type: 'widget',
      icon: '󰃠',
      widget: Widget.Box({
        homogeneous: false,
        children: [
          Widget.Label('['),
          Widget.Slider({
            drawValue: false,
            hexpand: true,
            value: brightness.bind(),
            min: 0,
            max: 100,
            onChange: ({ value }) => Utils.exec(`brightnessctl s ${value}%`)
          }),
          Widget.Label(']')
        ]
      })
    }
  }
}
