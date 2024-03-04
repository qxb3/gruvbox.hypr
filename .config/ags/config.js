import Bar from './windows/bar/Bar.js'
import Notifications from './windows/notifications/Notifications.js'

export default {
  style: App.configDir + '/out.css',
  icons: `${App.configDir}/assets/svg`,
  windows: [
    Bar,
    Notifications
  ]
}
