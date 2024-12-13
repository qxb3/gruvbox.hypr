import Notifyd from 'gi://AstalNotifd'
import { createTree, FType, Tree } from '@windows/file_explorer/utils'
import { bind } from 'astal'

const notifyd = Notifyd.get_default()

const notifications: Tree = {
  type: FType.CUSTOM,
  widget: (
    <box vertical={true}>
      {bind(notifyd, 'notifications').as(notifications => {
        return createTree({
          type: FType.DIR,
          name: 'notifications',
          children: notifications.map(notification => ({
            type: FType.FILE,
            name: notification.get_app_name(),
            value: notification.get_body()
          }))
        })
      })}
    </box>
  )
}

export default notifications
