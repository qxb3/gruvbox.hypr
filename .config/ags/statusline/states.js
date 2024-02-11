import Variable from 'resource:///com/github/Aylur/ags/variable.js'
import { state } from '../shared/utils.js'

export const revealAppLauncher = state('app_launcher', false)
export const query = Variable('')
export const queriedApps = Variable([])
export const selectedApp = Variable()
export const selectedAppIndex = Variable(0)
