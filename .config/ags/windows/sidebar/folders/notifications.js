import {
  createTree
} from '../fns.js'

const Notifications = await Service.import('notifications')

export default {
  type: 'custom',
  child: Widget.Box({
    vertical: true
  }).hook(Notifications, (self) => {
    const notifications = Notifications.notifications.reduce((acc, notif) => {
      const { appName } = notif

      if (!acc[appName]) {
        acc[appName] = {
          type: 'dir',
          children: {}
        }
      }

      acc[appName].children[notif.id] = {
        type: 'custom',
        child: Widget.Label({
          label: appName === 'Spotify' ? `󰝚 Playing - ${notif.summary}` : notif.summary,
          maxWidthChars: 24,
          truncate: 'end'
        })
      }

      return acc
    }, {})

    self.children = createTree({
      notifications: {
        type: 'dir',
        children: notifications
      }
    })
  }, 'changed')
}
