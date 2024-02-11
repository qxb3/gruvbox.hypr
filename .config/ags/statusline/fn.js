import App from 'resource:///com/github/Aylur/ags/app.js'

import {
  revealAppLauncher,
  queriedApps,
  selectedApp,
  selectedAppIndex
} from './states.js'

export function exitAppsSelect() {
  App.closeWindow('apps')

  revealAppLauncher.value = false
}

export function appsSelectUp() {
  if (!queriedApps.value) return

  if (selectedAppIndex.value > 0) {
    selectedAppIndex.value -= 1
    selectedApp.value = queriedApps.value[selectedAppIndex.value]
  }
}

export function appsSelectDown() {
  if (!queriedApps.value) return

  if (selectedAppIndex.value < queriedApps.value.length - 1) {
    selectedAppIndex.value += 1
    selectedApp.value = queriedApps.value[selectedAppIndex.value]
  }
}

export function appLaunch() {
  exitAppsSelect()
  selectedApp.value.launch()
}
