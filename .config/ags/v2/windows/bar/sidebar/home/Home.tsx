import UserHeader from './sections/UserHeader'
import DesktopControls from './sections/DesktopControls'
import MusicPlayer from './sections/MusicPlayer'
import NotificationCenter from './sections/NotificationCenter'

export default function() {
  return (
    <box
      name='home'
      className='sidebar_home'
      vertical={true}>
      <UserHeader />
      <DesktopControls />
      <MusicPlayer />
      <NotificationCenter />
    </box>
  )
}
