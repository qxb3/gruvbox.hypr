import { exec, execAsync, monitorFile, Variable } from 'astal'

import {
  revealSideBar,
  sideBarShown
} from '../vars'

function getWallpapers() {
  return exec(`find -L ${WALLPAPERS_PATH}/current.walls -iname '*.png' -or -iname '*.jpg'`)
    .split('\n')
}

function Wallpapers() {
  const wallpapers = Variable<string[]>(getWallpapers())

  monitorFile(
    `${WALLPAPERS_PATH}/.changed`,
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
              exec(`ln -sf ${wallpaper} ${WALLPAPERS_PATH}/current.walls`)
              execAsync(`swww img ${wallpaper} --transition-type "wipe" --transition-duration 3`)

              execAsync(`rm -rf ${HOME_DIR}/.cache/fastfetch/images`)
              execAsync(`magick ${wallpaper} -gravity Center -crop 1:1 -resize 500x500 +repage ${WALLPAPERS_PATH}/current.crop`)

              sideBarShown.set('home')
              revealSideBar.set(false)
            }}>
            <box
              className='img'
              css={`background-image: url("${wallpaper}");`}
            />
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
