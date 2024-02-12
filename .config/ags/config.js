import Bar from './statusline/line.js'
import AppsList from './statusline/apps.js'

export default {
  style: App.configDir + '/out.css',
  windows: [
    Bar,
    AppsList
  ]
}
