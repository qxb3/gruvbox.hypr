const NotificationsService = await Service.import('notifications')
NotificationsService.popupTimeout = 5000

function NotificationIcon({ image, appIcon, appEntry }) {
  if (image) {
    return Widget.Box({
      className: 'image',
      css: `background-image: url('${image}')`
    })
  }

  let icon = 'dialog-information-symbolic'
  if (Utils.lookUpIcon(appIcon)) icon = appIcon
  if (appEntry && Utils.lookUpIcon(appEntry)) icon = appEntry

  return Widget.Icon(icon)
}

function Notification(notification) {
  const icon = Widget.Box({
    className: 'icon',
    vpack: 'start',
    child: NotificationIcon(notification)
  })

  const appName = Widget.Label({
    className: 'appname',
    label: notification.appName.toUpperCase(),
    truncate: 'end',
    justification: 'left',
    maxWidthChars: 16,
    xalign: 0,
  })

  const title = Widget.Label({
    className: 'title',
    label: notification.summary,
    justification: 'left',
    truncate: 'end',
    xalign: 0,
    useMarkup: true
  })

  const body = Widget.Label({
    className: 'body',
    label: `- ${notification.body}`,
    justification: 'left',
    truncate: 'end',
    lines: 2,
    xalign: 0,
    wrap: true,
    useMarkup: true,
    hexpand: true
  })

  return Widget.EventBox({
    child: Widget.Box({
      className: `notification ${notification.urgency}`,
      spacing: 8,
      children: [
        icon,
        Widget.Box({
          className: 'meta',
          vertical: true,
          spacing: 4,
          children: [
            appName,
            Widget.Box({
              vertical: true,
              children: [
                title,
                body
              ]
            })
          ]
        })
      ]
    })
  })
}

function Notifications() {
  return Widget.Box({
    className: 'notification_popups',
    vertical: true,
    spacing: 4,
    children: NotificationsService.bind('popups').as(popups => popups.map(Notification))
  })
}

export default Widget.Window({
  name: 'notifications',
  anchor: ['top', 'right'],
  child: Widget.Box({
    css: `padding: 0.1px`,
    child: Notifications()
  })
})
