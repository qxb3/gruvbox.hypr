import NotifdService from 'gi://AstalNotifd'
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
        // <revealer
        //   revealChild={true}
        //   transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
        //   transitionDuration={300}
        //   hexpand={true}
        //   setup={(self) => {
        //     self.hook(notification, 'resolved', (_, reason) => {
        //       if (reason === NotifdService.ClosedReason.DISMISSED_BY_USER) {
        //         self.revealChild = false
        //       }
        //     })
        //   }}>
        <box
          className='notification'
          spacing={8}>
          {/* Image */}
          <box
            className='image'
            css={`background-image: url("${notification.get_image() ?? `${SRC}/assets/bell.svg`}");`}>
          </box>

          {/* Meta */}
          <box
            className='meta'
            vertical={true}
            spacing={4}>
            {/* App Name */}
            <label
              className='appname'
              label={notification.get_app_name().toUpperCase()}
              truncate={true}
              xalign={0}
              hexpand={true}
            />

            <box vertical={true}>
              {/* Summary */}
              <label
                className='summary'
                label={notification.get_summary()}
                justify={Gtk.Justification.LEFT}
                truncate={true}
                useMarkup={true}
                xalign={0}
              />

              {/* Body */}
              <label
                className='body'
                label={`- ${notification.get_body()}`}
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

          {/* Dismiss Notification */}
          <button
            className='dismiss_notification'
            cursor='pointer'
            halign={Gtk.Align.END}
            valign={Gtk.Align.START}
            hexpand={true}
            onClick={() => notification.dismiss()}>
            <label label='󰅙' />
          </button>
        </box>
        // </revealer>
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
