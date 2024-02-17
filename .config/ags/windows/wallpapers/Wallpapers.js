import Gdk from 'gi://Gdk'
import Fuse from '../../node_modules/fuse.js/dist/fuse.mjs'

import {
  WALLPAPER_PATH,
  revealWallpapers,
  wallpaperFiles
} from './misc/vars.js'

const resultWallpapers = Variable(wallpaperFiles.value)
const queriedWallpapers = Variable([])
const selectedWallpaper = Variable()
const selectedIndex = Variable()

function prev() {
  if (selectedIndex.value >= 0) {
    selectedIndex.value -= 1
    selectedWallpaper.value = resultWallpapers.value[selectedIndex.value]
  }
}

function next() {
  if (selectedIndex.value < resultWallpapers.value.length - 1) {
    selectedIndex.value += 1
    selectedWallpaper.value = resultWallpapers.value[selectedIndex.value]
  }
}

function WallpaperFile(wallpaper) {
  return Widget.Label({
    className: 'file',
    xalign: 0,
    vpack: 'end',
    setup: (self) => self.hook(selectedWallpaper, () => {
      if (selectedWallpaper.value === wallpaper) {
        self.className = 'file selected'
        self.label = `> 󰋩 ~/.config/swww/${wallpaper}`
      } else {
        self.className = 'file'
        self.label = `  󰋩 ~/.config/swww/${wallpaper}`
      }
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
        children: resultWallpapers.bind().transform((wallpapers) => wallpapers.map(WallpaperFile)),
        setup: (self) => self.hook(queriedWallpapers, () => {
          resultWallpapers.value = queriedWallpapers.value.length > 0
            ? queriedWallpapers.value
            : wallpaperFiles.value
        })
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

          selectedIndex.value = resultWallpapers.value.length - 1
          selectedWallpaper.value = resultWallpapers.value[selectedIndex.value]
        },
        onAccept: () => {
          const selected = `${WALLPAPER_PATH}/${selectedWallpaper.value}`

          Utils.exec(`rm ${WALLPAPER_PATH}/current.set`)
          Utils.exec(`rm /usr/share/sddm/themes/corners/backgrounds/background.png`)

          Utils.exec(`ln -s ${selected} ${WALLPAPER_PATH}/current.set`)
          Utils.exec(`ln -s ${selected} /usr/share/sddm/themes/corners/backgrounds/background.png`)

          Utils.exec(`swww img ${selected} --transition-type "wipe" --transition-duration 1`)

          revealWallpapers.value = false
        }
      }).hook(revealWallpapers, (self) => {
        selectedIndex.value = resultWallpapers.value.length - 1
        selectedWallpaper.value = resultWallpapers.value[selectedIndex.value]

        if (!revealWallpapers.value) return self.text = ''

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
        setup: (self) => self.hook(selectedWallpaper, () => {
          self.css = `background-image: url('${WALLPAPER_PATH}/${selectedWallpaper.value}')`
        })
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
      case Gdk.KEY_Up:
        prev()
        break
      case Gdk.KEY_Tab:
      case Gdk.KEY_Down:
        next()
        break
    }
  })
})
