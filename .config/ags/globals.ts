import { exec } from 'astal'

const user = exec(`whoami`)
const homeDir = exec(`bash -c 'echo $HOME'`)

declare global {
  const USER: string
  const HOME_DIR: string
  const TMP: string
}

Object.assign(globalThis, {
  USER: user,
  HOME_DIR: homeDir,
  TMP: `/tmp`,
})
