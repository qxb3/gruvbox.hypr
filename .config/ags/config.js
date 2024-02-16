import StatusLine from './windows/statusline/StatusLine.js'
import Sidebar from './windows/sidebar/Sidebar.js'

globalThis.SHARED_PATH = `${App.configDir}/shared`

export default {
  style: App.configDir + '/out.css',
  windows: [
    StatusLine,
    Sidebar
  ]
}
