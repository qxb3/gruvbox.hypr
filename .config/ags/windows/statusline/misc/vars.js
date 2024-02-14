import { state } from '../../../shared/utils.js'

export const mode = Variable('workspace')

export const revealAppLauncher = state('reveal_applauncher', false)
export const appLauncherQuery = Variable('')
export const queriedApps = Variable([])
export const selectedApp = Variable()
export const selectedAppIndex = Variable(0)

export const revealCommands = state('reveal_commands', false)
export const commandsQuery = Variable('')
export const queriedCommands = Variable([])
export const selectedCommand = Variable()
export const selectedCommandIndex = Variable(0)

revealAppLauncher.connect('changed', () => {
  if (revealAppLauncher.value) mode.value = 'applauncher'
  else mode.value = 'workspace'
})

revealCommands.connect('changed', () => {
  if (revealCommands.value) mode.value = 'commands'
  else mode.value = 'workspace'
})
