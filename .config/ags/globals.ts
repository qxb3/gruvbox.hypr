import { exec } from 'astal'

const user = exec(`whoami`)
const homeDir = exec(`bash -c 'echo $HOME'`)

declare global {
  const USER: string
  const HOME_DIR: string
  const TMP: string

  const ANIMATION_SPEED: number
}

Object.assign(globalThis, {
  USER: user,
  HOME_DIR: homeDir,
  TMP: `/tmp`,

  ANIMATION_SPEED: 100
})
