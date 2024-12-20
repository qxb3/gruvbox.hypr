import { exec } from 'astal'

const user = exec(`whoami`)
const homeDir = exec(`bash -c 'echo $HOME'`)
const distro = exec(`bash -c "grep ^PRETTY_NAME /etc/os-release | cut -d '=' -f 2"`)
                .replaceAll('"', '')

export interface UserSettings {
  terminal: string
  codeEditor: string
  browser: string
  animationSpeed: number
}

declare global {
  const USER: string
  const HOME_DIR: string
  const DISTRO: string
  const TMP: string

  const USER_SETTINGS: UserSettings
}

Object.assign(globalThis, {
  USER: user,
  HOME_DIR: homeDir,
  DISTRO: distro,
  TMP: `/tmp`,

  USER_SETTINGS: {
    terminal: 'kitty',
    codeEditor: 'nvim',
    browser: 'firefox',
    animationSpeed: 500
  }
})
