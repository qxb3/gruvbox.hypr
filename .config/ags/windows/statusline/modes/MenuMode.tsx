import { App, Astal, Gdk } from 'astal/gtk3'
import { Binding, Variable } from 'astal'
import Fuse from 'fuse.js'

import { statusLineMode } from '../vars'

function ItemsMenu(props: {
  gdkmonitor: Gdk.Monitor,
  child?: JSX.Element | Binding<JSX.Element> | Binding<Array<JSX.Element>>
  children?: Array<JSX.Element> | Binding<Array<JSX.Element>>
}) {
  const { gdkmonitor, child, children } = props

  return (
    <window
      namespace='astal_menu_mode'
      application={App}
      gdkmonitor={gdkmonitor}
      anchor={Astal.WindowAnchor.LEFT | Astal.WindowAnchor.BOTTOM}
      setup={(self) => App.add_window(self)}>
      <box
        className='menu_mode_menu'
        vertical={true}>
        {child ?? children}
      </box>
    </window>
  )
}

export default function MenuMode<T>(props: {
  gdkmonitor: Gdk.Monitor,
  mode: string,
  items: T[],
  keys: string[],
  queriedItems: Variable<T[]>,
  selectedItem: Variable<T>,
  selectedIndex: Variable<number>,
  maxResult?: number,
  onEnter: (selectedItem: T) => void,
  child?: JSX.Element | Binding<JSX.Element> | Binding<Array<JSX.Element>>
  children?: Array<JSX.Element> | Binding<Array<JSX.Element>>
}) {
  const {
    gdkmonitor,
    mode,
    items,
    keys,
    queriedItems,
    selectedItem,
    selectedIndex,
    maxResult = 15,
    onEnter,
    child,
    children
  } = props

  const fuse = new Fuse(items, {
    useExtendedSearch: true,
    includeMatches: true,
    keys
  })

  return (
    <box
      name={mode}
      className={`menu ${mode}`}>
      <label label=':' />
      <entry
        onChanged={({ text }) => {
          if (!text) queriedItems.set(items.slice(0, maxResult))
          else queriedItems.set(
            fuse.search(text)
              .map(({ item }) => item)
              .slice(0, maxResult)
          )

          selectedItem.set(queriedItems.get()[0])
          selectedIndex.set(0)
        }}
        onKeyPressEvent={(_, event) => {
          const keyval = event.get_keyval().pop()

          const queried = queriedItems.get()
          const index = selectedIndex.get()

          switch (keyval) {
            case Gdk.KEY_Escape:
              return statusLineMode.set('normal')
            case Gdk.KEY_Tab:
            case Gdk.KEY_Down:
              if (!queried) return

              if (index < queried.length - 1) {
                selectedIndex.set(index + 1)
                selectedItem.set(queried[selectedIndex.get()])
              }

              break
            case Gdk.KEY_Up:
              if (!queried) return

              if (index > 0) {
                selectedIndex.set(index - 1)
                selectedItem.set(queried[selectedIndex.get()])
              }

              break
            case 65293: // Enter
              onEnter(selectedItem.get())
              statusLineMode.set('normal')
              break
          }
        }}
        setup={(self) => {
          const Menu = ItemsMenu({ gdkmonitor, children, child })
          Menu.set_visible(false)

          self.hook(statusLineMode, () => {
            if (statusLineMode.get() !== mode) {
              Menu.set_visible(false)

              self.text = ''

              selectedItem.set(queriedItems.get()[0])
              selectedIndex.set(0)

              return
            }

            Menu.set_visible(true)
            self.grab_focus()
          })
        }}
      />
    </box>
  )
}
