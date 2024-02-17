import { getWallpapers } from './fns.js'
import { state } from '../../../shared/utils.js'

export const WALLPAPER_PATH = `/home/${Utils.exec('whoami')}/.config/swww`
export const revealWallpapers = state('reveal_wallpapers', false)
export const wallpaperFiles = Variable(getWallpapers())

Utils.monitorFile(WALLPAPER_PATH, () => {
  wallpaperFiles.value = getWallpapers()
})
