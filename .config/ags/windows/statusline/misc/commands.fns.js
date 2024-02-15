import {
  revealCommands,
  queriedCommands,
  selectedCommand,
  selectedCommandIndex
} from './vars.js'

export function runCommand() {
  exitCommandsSelect()

  if (!selectedCommand.value) return
  selectedCommand.value.fn()
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

export function exitCommandsSelect() {
  App.closeWindow('commands')

  revealCommands.value = false
}
