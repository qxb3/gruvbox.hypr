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
            setup: (self) => self.poll(2000, () => {
              const cpu = Utils.exec(`top -b -n 1`)
                .split('\n')
                .find(line => line.includes('Cpu(s)'))
                .split(/\s+/)[1]
                .replace(',', '.')

              self.value = parseFloat(cpu) / 100
            })
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
            setup: (self) => self.poll(2000, () => {
              const [total, used] = Utils.exec(`free`)
                .split('\n')
                .find(line => line.includes('Mem:'))
                .split(/\s+/)
                .splice(1, 2)

              self.value = parseFloat(used) / parseFloat(total)
            })
          }),
          Widget.Label(']')
        ]
      })
    },
    disk: {
      type: 'widget',
      icon: '󰉉',
      widget: Widget.Box({
        homogeneous: false,
        children: [
          Widget.Label('['),
          Widget.ProgressBar({
            className: 'metric',
            setup: (self) => self.poll(10000, () => {
              const [size, used] = Utils.exec(`df -h`)
                .split('\n')
                .find(line => line.includes('/'))
                .split(/\s+/)
                .map(v => v.replace(/G/g, ''))
                .splice(1, 2)

              self.value = parseFloat(used) / parseFloat(size)
            })
          }),
          Widget.Label(']')
        ]
      })
    }
  }
}
