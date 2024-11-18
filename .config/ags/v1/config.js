import Bar from './windows/bar/Bar.js'
import Notifications from './windows/notifications/Notifications.js'

App.config({
  style: App.configDir + '/out.css',
  windows: [
    Bar,
    Notifications
  ]
})
