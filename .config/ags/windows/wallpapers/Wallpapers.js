import Gdk from 'gi://Gdk'
import Fuse from '../../node_modules/fuse.js/dist/fuse.mjs'

import { revealWallpapers } from './misc/vars.js'
import { wallpaperFiles } from './misc/vars.js'

const query = Variable('')
const queriedWallpapers = Variable([])
const selectedWallpaper = Variable()

function WallpaperFile(wallpaper) {
  return Widget.Label({
    attribute: { wallpaper },
    className: 'file',
    label: `󰋩 ~/.config/swww/${wallpaper}`,
    xalign: 0,
    vpack: 'end',
    setup: (self) => self.hook(selectedWallpaper, () => {
      if (!selectedWallpaper.value) return

      if (selectedWallpaper.value === self.attribute.wallpaper) {
        self.className = 'file selected'
        self.label = `> 󰋩 ~/.config/swww/${wallpaper}`
      } else {
        self.className = 'file'
        self.label = `󰋩 ~/.config/swww/${wallpaper}`
      }

      console.log(self.className)
    })
  })
}

function List() {
  return Widget.Box({
    className: 'list',
    vexpand: true,
    vertical: true,
    children: [
      Widget.Box({
        vpack: 'end',
        vertical: true,
        vexpand: true,
        className: 'files',
        children: wallpaperFiles.bind().transform(wallpapers => wallpapers.map(WallpaperFile))
        // children: queriedWallpapers.bind().transform((queried) => queried.length > 0 ? queried.map(WallpaperFile) : wallpaperFiles.value.map(WallpaperFile))
      })
    ]
  })
}

function Input() {
  const fuse = new Fuse(wallpaperFiles.value, {
    useExtendedSearch: true,
    treshold: 1,
    distance: 5000
  })

  return Widget.Box({
    className: 'input_container',
    spacing: 4,
    children: [
      Widget.Label({
        className: 'indicator',
        label: '>'
      }),
      Widget.Entry({
        className: 'input',
        hexpand: true,
        onChange: ({ text }) => {
          queriedWallpapers.value = fuse.search(text).map(r => r.item).reverse()
          selectedWallpaper.value = queriedWallpapers.value[queriedWallpapers.length - 1]
        }
      }).hook(revealWallpapers, (self) => {
        if (!revealWallpapers.value) return self.text = ''

        console.log(queriedWallpapers.value)
        selectedWallpaper.value = wallpaperFiles.value[wallpaperFiles.value.length - 1]
        self.grab_focus()
      })
    ]
  })
}

function Wallpapers() {
  const Preview = Widget.Box({
    className: 'preview',
    children: [
      Widget.Box({
        className: 'image',
        hexpand: true,
        css: `background-image: url('/home/qxb3/.config/swww/town.jpg')`
      })
    ]
  })

  return Widget.Box({
    className: 'wallpapers',
    spacing: 4,
    children: [
      Widget.Box({
        spacing: 4,
        vertical: true,
        children: [
          List(),
          Input()
        ]
      }),
      Preview
    ]
  })
}

export default Widget.Window({
  name: 'wallpapers',
  layer: 'overlay',
  keymode: revealWallpapers.bind().transform(r => r ? 'exclusive' : 'none'),
  child: Widget.Box({
    css: `padding: 0.1px`,
    child: Widget.Revealer({
      revealChild: revealWallpapers.bind(),
      transition: 'none',
      child: Wallpapers()
    })
  }).on('key-press-event', (_, event) => {
    const key = event.get_keyval()[1]

    switch (key) {
      case Gdk.KEY_Escape:
        revealWallpapers.value = false
        break
    }
  })
})
