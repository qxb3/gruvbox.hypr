import { Variable } from 'astal'
import { revealAppLauncher } from './windows/app_launcher/vars'

enum RevealerCommand {
  OPEN,
  CLOSE,
  TOGGLE
}

function handleRevealer(command: RevealerCommand, revealer: Variable<boolean>): string {
  switch (command) {
    case RevealerCommand.OPEN:
      revealer.set(true)
      return `${revealer.get()}`
    case RevealerCommand.CLOSE:
      revealer.set(false)
      return `${revealer.get()}`
    case RevealerCommand.TOGGLE:
      revealer.set(!revealer.get())
      return `${revealer.get()}`
  }
}

export default function requestHandler(request: string, res: (response: any) => void) {
  const args = request.split(':')

  switch (args[0]) {
    case 'app_launcher':
      switch (args[1]) {
        case 'open': return handleRevealer(RevealerCommand.OPEN, revealAppLauncher)
        case 'close': return handleRevealer(RevealerCommand.CLOSE, revealAppLauncher)
        case 'toggle': return handleRevealer(RevealerCommand.TOGGLE, revealAppLauncher)
        default: return 'Unknown command for app_launcher.'
      }
    default:
      return res('Unknown request.')
  }
}
