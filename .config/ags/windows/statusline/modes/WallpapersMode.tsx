import { Gdk } from 'astal/gtk3'
import { exec, execAsync, Variable } from 'astal'

import MenuMode from './MenuMode'

const wallpapers = exec(`bash -c "find -L ~/.config/swww -iname '*.png'"`)
  .split('\n')
  .map(path => ({
    name: path.split('/').pop(),
    path
  }))

const queriedWallpapers = Variable(wallpapers)
const selectedWallpaper = Variable(queriedWallpapers.get()[0])
const selectedIndex = Variable(0)

export default function WallpapersMode(props: { gdkmonitor: Gdk.Monitor }) {
  const { gdkmonitor } = props

  return (
    <MenuMode
      gdkmonitor={gdkmonitor}
      mode='wallpapers'
      items={wallpapers}
      keys={['name']}
      queriedItems={queriedWallpapers}
      selectedItem={selectedWallpaper}
      selectedIndex={selectedIndex}
      onEnter={(selectedWallpaper) => {
        execAsync(`
          swww img ${selectedWallpaper.path}
            --transition-type "none"
            --transition-duration 0
        `)
      }}>
      {queriedWallpapers(wallpapers => wallpapers.map(wallpaper => (
        <box
          className={
            selectedWallpaper(selectedCmd =>
              selectedCmd.name === wallpaper.name
                ? 'selected item'
                : 'item'
            )
          }>
          <label
            className='name'
            label={wallpaper.name}
            truncate={true}
          />
        </box>
      )))}
    </MenuMode>
  )
}
