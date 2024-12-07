import GdkPixbuf from 'gi://GdkPixbuf'
import { exec, execAsync, monitorFile, Variable } from 'astal'

import {
  revealSideBar,
  sideBarShown
} from '../vars'

function getWallpapers() {
  return exec(`find -L ${LOCAL_STATE}/wallpapers -iname '*.png' ! -iname 'default.png'`)
    .split('\n')
}

function Wallpapers() {
  const wallpapers = Variable<string[]>(getWallpapers())

  monitorFile(
    `${LOCAL_STATE}/theme_changed`,
    () => wallpapers.set(getWallpapers())
  )

  return (
    <scrollable vexpand={true}>
      <box
        className='list'
        vertical={true}
        spacing={12}>
        {wallpapers(wallpapers => wallpapers.map(wallpaper => (
          <button
            className='wallpaper'
            cursor='pointer'
            onClick={() => {
              exec(`ln -sf ${wallpaper} ${LOCAL_STATE}/current_wallpaper`)
              execAsync(`swww img ${LOCAL_STATE}/current_wallpaper --transition-type "wipe" --transition-duration 3`)

              execAsync(`rm -rf ${HOME_DIR}/.cache/fastfetch/images`)
              execAsync(`magick ${wallpaper} -gravity Center -crop 1:1 -resize 500x500 +repage ${LOCAL_STATE}/current_wallpaper.crop`)

              sideBarShown.set('home')
              revealSideBar.set(false)
            }}>
            <overlay>
              <box className='img_container' />
              <icon
                className='img'
                pixbuf={GdkPixbuf.Pixbuf.new_from_file(wallpaper)}
              />
            </overlay>
          </button>
        )))}
      </box>
    </scrollable>
  )
}

export default function() {
  return (
    <box
      name='wallpapers'
      className='wallpapers'
      vertical={true}>
      <Wallpapers />
    </box>
  )
}
