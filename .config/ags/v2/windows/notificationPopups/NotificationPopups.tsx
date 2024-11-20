import NotifydService from 'gi://AstalNotifd'

import { App, Astal, Gdk, Gtk } from 'astal/gtk3'
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
          <box
            className='notification'
            spacing={8}>
            {/* Image */}
            <box
              className='image'
              css={`background-image: url("${popupNotif.get_image() ?? `${SRC}/assets/bell.svg`}");`}>
            </box>

            {/* Meta */}
            <box
              className='meta'
              vertical={true}
              spacing={4}>
              {/* App Name */}
              <label
                className='appname'
                label={popupNotif.get_app_name().toUpperCase()}
                truncate={true}
                xalign={0}
                hexpand={true}
              />

              <box vertical={true}>
                {/* Summary */}
                <label
                  className='summary'
                  label={popupNotif.get_summary()}
                  justify={Gtk.Justification.LEFT}
                  truncate={true}
                  useMarkup={true}
                  xalign={0}
                />

                {/* Body */}
                <label
                  className='body'
                  label={`- ${popupNotif.get_body()}`}
                  justify={Gtk.Justification.LEFT}
                  truncate={true}
                  useMarkup={true}
                  hexpand={true}
                  wrap={true}
                  lines={2}
                  xalign={0}
                />
              </box>
            </box>
          </box>
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
      <box css='padding: 0.1px;'>
        <NotificationPopups />
      </box>
    </window>
  )
}
