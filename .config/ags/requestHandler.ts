import { statusLineMode } from '@windows/statusline/vars'
import { revealFileExplorer } from '@windows/file_explorer/vars'

function handleStatusLine(args: string[]): string {
  const [command, mode] = args

  if (!command) return `err [msg="'command' is required."]`
  if (!mode) return `err [msg="'mode' is required."]`

  if (command === 'toggle') {
    switch (mode) {
      case 'normal': return `err [msg="cannot toggle normal mode."]`
      case 'appLauncher':
        statusLineMode.set(
          statusLineMode.get() === 'appLauncher'
            ? 'normal'
            : 'appLauncher'
        )
        return `ok [cmd="toggle",mode="${statusLineMode.get()}"]`
      default:
        return `err [msg="Unknown args for toggle statusline."]`
    }
  }

  return `err [msg="Unknown args for statusline."]`
}

function handleFileExplorer(args: string[]): string {
  const [command] = args

  if (!command) return `err [msg="'command' is required."]`

  switch(command) {
    case 'open':
      revealFileExplorer.set(true)
      return `ok [state=true']`
    case 'close':
      revealFileExplorer.set(false)
      return `ok [state=false']`
    case 'toggle':
      revealFileExplorer.set(
        !revealFileExplorer.get()
      )
      return `ok [state=${revealFileExplorer.get()}]`
    default:
      return `err [msg="Uknown args for sidebar."]`
  }
}

export default function requestHandler(request: string, res: (response: any) => void) {
  const args = request.split(':')

  switch (args[0]) {
    case 'statusline':
      return res(handleStatusLine(args.slice(1)))
    case 'file_explorer':
      return res(handleFileExplorer(args.slice(1)))
    default:
      return res('Unknown request.')
  }
}
