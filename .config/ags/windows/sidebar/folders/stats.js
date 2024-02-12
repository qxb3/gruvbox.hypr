export default {
  type: 'dir',
  children: {
    cpu: {
      type: 'widget',
      icon: '',
      spacing: 2,
      widget: Widget.Box({
        homogeneous: false,
        children: [
          Widget.Label('['),
          Widget.ProgressBar({
            className: 'metric',
            value: 0.1
          }),
          Widget.Label(']')
        ]
      })
    },
    ram: {
      type: 'widget',
      icon: '',
      spacing: 2,
      widget: Widget.Box({
        homogeneous: false,
        children: [
          Widget.Label('['),
          Widget.ProgressBar({
            className: 'metric',
            value: 0.25
          }),
          Widget.Label(']')
        ]
      })
    },
    disk: {
      type: 'widget',
      icon: '',
      widget: Widget.Box({
        homogeneous: false,
        children: [
          Widget.Label('['),
          Widget.ProgressBar({
            className: 'metric',
            value: 0.4
          }),
          Widget.Label(']')
        ]
      })
    }
  }
}
