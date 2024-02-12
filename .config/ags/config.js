import StatusLine from './windows/statusline/Line.js'
import AppsList from './windows/statusline/Apps.js'

export default {
  style: App.configDir + '/out.css',
  windows: [
    StatusLine,
    AppsList
  ]
}
