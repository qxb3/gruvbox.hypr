import SideBar from './windows/sidebar/SideBar.js'
import Bar from './windows/bar/Bar.js'

export default {
  style: App.configDir + '/out.css',
  windows: [
    SideBar,
    Bar
  ]
}
