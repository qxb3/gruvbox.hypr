import NotifydService from 'gi://AstalNotifd'
import Notification from '@widgets/Notification'

import { App, Astal, Gdk } from 'astal/gtk3'
import { timeout, Variable } from 'astal'

const TIMEOUT_DELAY = 5000
const notifyd = NotifydService.get_default()
const popups = Variable<NotifydService.Notification[]>([])

notifyd.connect('notified', (_, id) => {
  if (notifyd.get_dont_disturb()) return

  const notification = notifyd.get_notification(id)!
  popups.set([...popups.get(), notification])
})

function removePopup(id: number) {
  const filteredPopups = popups.get().filter(popup => id !== popup.id)
  popups.set(filteredPopups)
}

function NotificationPopups() {
  return (
    <box
      className='notification_popups'
      spacing={8}
      vertical={true}>
      {popups().as(popupNotifs => popupNotifs.map(popupNotif => (
        <eventbox
          onClick={() => removePopup(popupNotif.id)}
          setup={() => timeout(TIMEOUT_DELAY, () => removePopup(popupNotif.id))}>
          <Notification notification={popupNotif} showDismiss={false} />
        </eventbox>
      )))}
    </box>
  )
}

export default function (gdkmonitor: Gdk.Monitor) {
  return (
    <window
      namespace='notifications'
      application={App}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.IGNORE}
      layer={Astal.Layer.OVERLAY}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}>
      <NotificationPopups />
    </window>
  )
}
