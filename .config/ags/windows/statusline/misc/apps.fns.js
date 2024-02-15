import {
  revealAppLauncher,
  queriedApps,
  selectedApp,
  selectedAppIndex
} from './vars.js'

export function appLaunch() {
  exitAppsSelect()

  if (!selectedApp.value) return
  selectedApp.value.launch()
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

export function exitAppsSelect() {
  App.closeWindow('apps')

  revealAppLauncher.value = false
}
