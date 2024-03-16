const WALLPAPERS_PATH = `/home/${Utils.exec("whoami")}/.config/swww/small`

function Wallpaper(wallpaper) {
  console.log(wallpaper)
  return Widget.Button({
    className: 'wallpaper',
    cursor: 'pointer',
    onPrimaryClick: () => {
      Utils.exec(`rm ${WALLPAPERS_PATH}/current.set`)
      Utils.exec(`ln -s ${wallpaper} ${WALLPAPERS_PATH}/current.set`)

      Utils.exec(`bash -c "${App.configDir}/shared/scripts/sidebar.sh close"`)
      Utils.exec(`bash -c "${App.configDir}/shared/scripts/sidebar.sh toggle-wallpapers"`)

      Utils.exec(`swww img ${wallpaper} --transition-type "wipe" --transition-duration 0`)
    },
    child: Widget.Overlay({
      className: 'overlay',
      child: Widget.Box(),
      overlays: [
        Widget.Icon({
          className: 'img',
          icon: wallpaper,
          size: 450
        })
      ]
    })
  })
}

function WallpaperList() {
  return Widget.Scrollable({
    vexpand: true,
    child: Widget.Box({
      className: 'list',
      vertical: true,
      spacing: 12,
      children: Utils.exec(`find -L ${WALLPAPERS_PATH} -iname '*.png' -or -iname '*.jpg'`)
        .split('\n')
        .map(Wallpaper)
    })
  })
}

export default function() {
  return Widget.Box({
    className: 'wallpapers',
    vertical: true,
    children: [
      WallpaperList()
    ]
  })
}
