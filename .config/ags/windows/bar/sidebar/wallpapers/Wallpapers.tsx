import { exec, execAsync } from 'astal'
import { revealSideBar, sideBarShown } from '../vars'

const wallpapers = exec(`find -L ${WALLPAPERS_PATH} -iname '*.png' -or -iname '*.jpg'`).split('\n')

export default function() {
  return (
    <box
      name='wallpapers'
      className='wallpapers'
      vertical={true}>
      <scrollable vexpand={true}>
        <box
          className='list'
          vertical={true}
          spacing={12}>
          {wallpapers.map(wallpaper => (
            <button
              className='wallpaper'
              cursor='pointer'
              onClick={() => {
                exec(`ln -sf ${wallpaper} ${WALLPAPERS_PATH}/current.set`)
                execAsync(`swww img ${wallpaper} --transition-type "wipe" --transition-duration 3`)

                execAsync(`rm -rf /home/${exec('whoami')}/.cache/fastfetch/images`)
                execAsync(`magick ${wallpaper} -gravity Center -crop 1:1 -resize 500x500 +repage ${WALLPAPERS_PATH}/current.crop`)

                sideBarShown.set('home')
                revealSideBar.set(false)
              }}>
              <box
                className='img'
                css={`background-image: url("${wallpaper}");`}
              />
            </button>
          ))}
        </box>
      </scrollable>
    </box>
  )
}
