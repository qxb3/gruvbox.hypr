import StatusLine from './windows/statusline/Line.js'
import AppsList from './windows/statusline/Apps.js'
import Sidebar from './windows/sidebar/Sidebar.js'

export default {
  style: App.configDir + '/out.css',
  windows: [
    StatusLine,
    AppsList,
    Sidebar
  ]
}
