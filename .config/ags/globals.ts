import { exec } from 'astal'

const user = exec(`whoami`)
const homeDir = exec(`bash -c 'echo $HOME'`)

declare global {
  const USER: string
  const HOME_DIR: string
  const TMP: string

  const CPU_POLL: number
  const RAM_POLL: number
  const DISKS_POLL: number

  const ANIMATION_SPEED: number
}

Object.assign(globalThis, {
  USER: user,
  HOME_DIR: homeDir,
  TMP: `/tmp`,

  CPU_POLL: 5000,
  RAM_POLL: 5000,
  DISKS_POLL: 600000,

  ANIMATION_SPEED: 100
})
