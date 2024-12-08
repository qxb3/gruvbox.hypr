import NotifdService from 'gi://AstalNotifd'
import Notification from '@widgets/Notification'

import { Gtk } from 'astal/gtk3'
import { bind } from 'astal'

const notifyd = NotifdService.get_default()

function Header() {
  return (
    <box
      className='header'
      valign={Gtk.Align.START}>
      {/* Title */}
      <label
        className='title'
        label='Notifications'
        halign={Gtk.Align.START}
        hexpand={true}
      />

      {/* Clear Notifications */}
      <button
        className='clear_notifications'
        cursor='pointer'
        halign={Gtk.Align.END}
        onClick={() =>
          notifyd
            .get_notifications()
            .forEach(notification => notification.dismiss())
        }>
        <label label='󰎟' />
      </button>
    </box>
  )
}

function NotificationList({ notifications }: { notifications: NotifdService.Notification[] }) {
  return (
    <box
      className='notifications'
      vertical={true}
      spacing={8}>
      {notifications.map(notification => (
        <Notification notification={notification} />
      ))}
    </box>
  )
}

function NoNotification() {
  return (
    <box
      className='no_notification'
      halign={Gtk.Align.CENTER}
      vertical={true}>
      <label
        className='icon'
        label='󰂛'
        justify={Gtk.Justification.CENTER}
      />

      <label
        className='text'
        label='No Notification'
        justify={Gtk.Justification.CENTER}
      />
    </box>
  )
}

function Notifications() {
  return (
    <scrollable vexpand={true}>
      {bind(notifyd, 'notifications').as(notifications => (
        notifications.length > 0
          ? <NotificationList notifications={notifications} />
          : <NoNotification />
      ))}
    </scrollable>
  )
}

export default function() {
  return (
    <box
      className='notification_center'
      spacing={8}
      vertical={true}
      vexpand={true}>
      <Header />
      <Notifications />
    </box>
  )
}
