import Gdk from 'gi://Gdk'

/**
 * @param {Widget.MenuItem[]} menuItems
 * @returns {Widget.Menu}
*/
export function createLauncher(menuItems) {
  if (!menuItems) throw new Error('menuItems cannot be empty')

  const menu = Widget.Menu({
    children: menuItems
  })

  menu.open = (widget) => menu.popup_at_widget(widget, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)
  menu.close = () => menu.popup()

  return menu
}
