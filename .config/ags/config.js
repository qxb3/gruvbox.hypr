import App from 'resource:///com/github/Aylur/ags/app.js';
import AppLauncher from './applauncher/main.js'

export default {
  style: App.configDir + '/out.css',
  windows: [
    AppLauncher
  ]
}
