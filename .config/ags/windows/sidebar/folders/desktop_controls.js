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
          Widget.ProgressBar({
            className: 'metric',
            value: 1
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
          Widget.ProgressBar({
            className: 'metric',
            value: 0.8
          }),
          Widget.Label(']')
        ]
      })
    },
    bright: {
      type: 'widget',
      icon: '󰝚',
      widget: Widget.Box({
        homogeneous: false,
        children: [
          Widget.Label('['),
          Widget.ProgressBar({
            className: 'metric',
            value: 0.2
          }),
          Widget.Label(']')
        ]
      })
    }
  }
}
