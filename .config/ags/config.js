import Gtk from 'gi://Gtk?version=3.0'

import SideBar from './windows/sidebar/SideBar.js'
import Bar from './windows/bar/Bar.js'

Gtk.IconTheme.get_default().append_search_path(`${App.configDir}/assets/svg`)

export default {
  style: App.configDir + '/out.css',
  windows: [
    SideBar,
    Bar
  ]
}
