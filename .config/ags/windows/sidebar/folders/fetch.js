function getPkgs() {
  return Utils.exec(
    `script -qc "pacman -Q | wc -l" /dev/null`
  )
}

function getUptime() {
  return Utils.exec(
    `script -qc "uptime -p | awk '{print $2, $3}' | cut -d ',' -f1" /dev/null`
  )
}

export default {
  type: 'dir',
  children: {
    user: {
      type: 'file',
      icon: '',
      value: Utils.exec(`whoami`)
    },
    host: {
      type: 'file',
      icon: '󰧨',
      value: Utils.exec(`hostname`)
    },
    pkgs: {
      type: 'widget',
      icon: '󰏓',
      widget: Widget.Label({
        label: getPkgs(),
        setup: (self) => self.poll(5000, () => {
          self.label = getPkgs()
        })
      })
    },
    up: {
      type: 'widget',
      icon: '󰏓',
      spacing: 3,
      widget: Widget.Label({
        label: getUptime(),
        setup: (self) => self.poll(1000, () => {
          self.label = getUptime()
        })
      })
    }
  }
}
