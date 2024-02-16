export function getWallpapers() {
  return Utils
    .exec(`ls /home/${Utils.exec('whoami')}/.config/swww`)
    .split('\n')
    .filter(f => f !== 'current.set')
}
