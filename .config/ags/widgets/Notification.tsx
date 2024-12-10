import NotifdService from 'gi://AstalNotifd'

import { Gtk } from 'astal/gtk3'

export default function Notification({ notification, showDismiss }: { notification: NotifdService.Notification, showDismiss: boolean }) {
  return (
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
        visible={showDismiss}
        onClick={() => notification.dismiss()}>
        <label label='󰅙' />
      </button>
    </box>
  )
}
