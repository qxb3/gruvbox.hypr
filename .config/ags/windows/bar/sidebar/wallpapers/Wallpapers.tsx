import { exec } from 'astal'
import { revealSideBar, sideBarShown } from '../vars'

const WALLPAPERS_PATH = `/home/${exec('whoami')}/.config/swww`
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
                exec(`rm ${WALLPAPERS_PATH}/current.set`)
                exec(`ln -s ${wallpaper} ${WALLPAPERS_PATH}/current.set`)

                sideBarShown.set('home')
                revealSideBar.set(false)

                exec(`swww img ${wallpaper} --transition-type "wipe" --transition-duration 2`)
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
