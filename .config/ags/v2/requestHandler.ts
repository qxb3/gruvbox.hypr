import { revealSideBar, sideBarShown } from './windows/bar/sidebar/vars'

function handleSideBar(request: string[]): string {
  const [state, shown] = request

  if (!state) return `err [msg="'state' is required"]`
  if (!shown) return `err [msg="'shown' is required"]`

  if (state === 'toggle') {
    switch (shown) {
      case 'home':
        revealSideBar.set(!revealSideBar.get())
        return `ok [cmd="toggle",state=${revealSideBar.get()},shown="${sideBarShown.get()}"]`
      case 'appLauncher':
      case 'wallpapers':
        if (!revealSideBar.get()) revealSideBar.set(true)

        sideBarShown.set(sideBarShown.get() === shown ? 'home' : shown)
        return `ok [cmd="toggle",state=${revealSideBar.get()},shown="${sideBarShown.get()}"]`
    }
  }

  if (state === 'open') {
    sideBarShown.set(shown)
    revealSideBar.set(true)

    return `ok [cmd="open",state=${revealSideBar.get()},shown="${sideBarShown.get()}"]`
  }

  if (state === 'close') {
    sideBarShown.set('home')
    revealSideBar.set(false)

    return `ok [cmd="close",state=${revealSideBar.get()}]`
  }

  return 'err [msg="unknown request"]'
}

export default function requestHandler(request: string, res: (response: any) => void) {
  if (request.startsWith('sidebar')) {
    const result = handleSideBar(request.split(':').slice(-2))
    return res(result)
  }
}
