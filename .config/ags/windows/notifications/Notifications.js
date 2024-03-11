const NotificationsService = await Service.import('notifications')
NotificationsService.popupTimeout = 5000

function Notification(notification) {
  const Icon = Widget.Box({
    className: 'icon',
    css: `background-image: url("${notification.image ?? App.configDir + '/assets/svg/custom-svg-bell.svg'}")`
  })

  const AppName = Widget.Label({
    className: 'appname',
    label: notification.appName.toUpperCase(),
    truncate: 'end',
    justification: 'left',
    maxWidthChars: 16,
    xalign: 0
  })

  const Summary = Widget.Label({
    className: 'summary',
    label: notification.summary,
    justification: 'left',
    truncate: 'end',
    xalign: 0,
    useMarkup: true
  })

  const Body = Widget.Label({
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
    onPrimaryClick: () => notification.dismiss(),
    child: Widget.Box({
      className: `notification ${notification.urgency}`,
      spacing: 8,
      children: [
        Icon,
        Widget.Box({
          className: 'meta',
          vertical: true,
          spacing: 4,
          children: [
            AppName,
            Widget.Box({
              vertical: true,
              children: [
                Summary,
                Body
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
  anchor: ['top'],
  exclusivity: 'ignore',
  child: Widget.Box({
    css: `padding: 0.1px`,
    child: Notifications()
  })
})
