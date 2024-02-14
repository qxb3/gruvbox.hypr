import StatusLine from './windows/statusline/Line.js'
import AppsList from './windows/statusline/Apps.js'
import Sidebar from './windows/sidebar/Sidebar.js'

globalThis.SHARED_PATH = `${App.configDir}/shared`

export default {
  style: App.configDir + '/out.css',
  windows: [
    StatusLine,
    AppsList,
    Sidebar
  ]
}
