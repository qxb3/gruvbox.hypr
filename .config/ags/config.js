import App from 'resource:///com/github/Aylur/ags/app.js';

import Bar from './bar/main.js'
// import AppLauncher from './applauncher/main.js'

export default {
  style: App.configDir + '/out.css',
  windows: [
    Bar,
    // AppLauncher
  ]
}
