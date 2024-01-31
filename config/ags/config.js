import App from 'resource:///com/github/Aylur/ags/app.js';
import AppLauncher from './app_launcher/main.js'

export default {
  style: App.configDir + '/out.css',
  windows: [
    AppLauncher
  ]
}
