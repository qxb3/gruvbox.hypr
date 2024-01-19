import App from 'resource:///com/github/Aylur/ags/app.js';
import AppLauncher from './app_launcher/main.js'

App.resetCss()

export default {
  style: App.configDir + '/style.css',
  windows: [
    AppLauncher
  ]
}
