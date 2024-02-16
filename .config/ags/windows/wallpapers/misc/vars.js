import { getWallpapers } from './fns.js'
import { state } from '../../../shared/utils.js'

export const revealWallpapers = state('reveal_wallpapers', false)
export const wallpaperFiles = Variable(getWallpapers())

Utils.monitorFile(`/home/${Utils.exec('whoami')}/.config/swww`, () => {
  wallpaperFiles.value = getWallpapers()
})
