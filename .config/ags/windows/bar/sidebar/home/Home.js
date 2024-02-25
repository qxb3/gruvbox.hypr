import UserHeader from './sections/UserHeader.js'
import DesktopControls from './sections/DesktopControls.js'
import MusicPlayer from './sections/MusicPlayer.js'
import NotificationCenter from './sections/NotificationCenter.js'

export default function() {
  return Widget.Box({
    className: 'home',
    vertical: true,
    children: [
      UserHeader(),
      DesktopControls(),
      MusicPlayer(),
      NotificationCenter()
    ]
  })
}
