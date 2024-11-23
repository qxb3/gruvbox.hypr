import { exec } from 'astal'

const user = exec(`whoami`)
const homeDir = `/home/${user}`

declare global {
  const USER: string
  const HOME_DIR: string
  const WALLPAPERS_PATH: string

  const ANIMATION_SPEED: number
}

Object.assign(globalThis, {
  USER: user,
  HOME_DIR: homeDir,
  WALLPAPERS_PATH: `${homeDir}/.config/swww`,

  ANIMATION_SPEED: 300
})
