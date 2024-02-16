import StatusLine from './windows/statusline/StatusLine.js'
import Sidebar from './windows/sidebar/Sidebar.js'
import Wallpapers from './windows/wallpapers/Wallpapers.js'

export default {
  style: App.configDir + '/out.css',
  windows: [
    StatusLine,
    Sidebar,
    Wallpapers
  ]
}
