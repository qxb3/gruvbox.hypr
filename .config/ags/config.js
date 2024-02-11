import App from 'resource:///com/github/Aylur/ags/app.js';

import Bar from './statusline/line.js'
import Apps from './statusline/apps.js'

export default {
  style: App.configDir + '/out.css',
  windows: [
    Bar,
    Apps
  ]
}
