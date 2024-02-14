import {
  revealAppLauncher,
  queriedApps,
  selectedApp,
  selectedAppIndex,
  revealCommands,
  queriedCommands,
  selectedCommand,
  selectedCommandIndex
} from './vars.js'

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

  if (!selectedApp.value) return
  selectedApp.value.launch()
}

export function exitCommandsSelect() {
  App.closeWindow('commands')

  revealCommands.value = false
}

export function commandsSelectUp() {
  if (!queriedCommands.value) return

  if (selectedCommandIndex.value > 0) {
    selectedCommandIndex.value -= 1
    selectedCommand.value = queriedCommands.value[selectedCommandIndex.value]
  }
}

export function commandsSelectDown() {
  if (!queriedCommands.value) return

  if (selectedCommandIndex.value < queriedCommands.value.length - 1) {
    selectedCommandIndex.value += 1
    selectedCommand.value = queriedCommands.value[selectedCommandIndex.value]
  }
}

export function runCommand() {
  exitCommandsSelect()

  if (!selectedCommand.value) return
  selectedCommand.value.fn()
}

export function assignBatteryIcon(charging, percent) {
  if (charging) {
    if (percent >= 0   && percent <= 10) return '󰢟'
    if (percent >= 10  && percent <= 20) return '󰢟'
    if (percent >= 20  && percent <= 30) return '󰂆'
    if (percent >= 30  && percent <= 40) return '󰂇'
    if (percent >= 40  && percent <= 50) return '󰂈'
    if (percent >= 50  && percent <= 60) return '󰢝'
    if (percent >= 60  && percent <= 70) return '󰂉'
    if (percent >= 70  && percent <= 80) return '󰢞'
    if (percent >= 80  && percent <= 90) return '󰂊'
    if (percent >= 90  && percent <= 99) return '󰂋'
    if (percent >= 99                  ) return '󱟢'
  } else {
    if (percent >= 0   && percent <= 10) return '󰂎'
    if (percent >= 10  && percent <= 20) return '󰁺'
    if (percent >= 20  && percent <= 30) return '󰁻'
    if (percent >= 30  && percent <= 40) return '󰁻'
    if (percent >= 40  && percent <= 50) return '󰁽'
    if (percent >= 50  && percent <= 60) return '󰁾'
    if (percent >= 60  && percent <= 70) return '󰁿'
    if (percent >= 70  && percent <= 80) return '󰂀'
    if (percent >= 80  && percent <= 90) return '󰂁'
    if (percent >= 90  && percent <= 99) return '󰂂'
    if (percent >= 99                  ) return '󰁹'
  }

  return '󱉝'
}
