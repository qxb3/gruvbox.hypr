import { revealSideBar } from './windows/bar/sidebar/vars'

function handleSideBar(request: string): string {
  if (request === 'toggle') {
    revealSideBar.set(!revealSideBar.get())
    return `ok toggle - ${revealSideBar.get() ? 'open' : 'close'}`
  }

  if (request === 'open') {
    revealSideBar.set(true)
    return 'ok open'
  }

  if (request === 'close') {
    revealSideBar.set(false)
    return 'ok close'
  }

  return 'err unknown request'
}

export default function requestHandler(request: string, res: (response: any) => void) {
  if (request.startsWith('sidebar')) {
    const result = handleSideBar(request.split(':').pop()!)
    return res(result)
  }
}
