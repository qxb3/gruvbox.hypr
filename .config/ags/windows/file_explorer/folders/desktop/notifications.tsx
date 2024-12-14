import Notifyd from 'gi://AstalNotifd'
import { createTree, FType, Tree } from '@windows/file_explorer/utils'
import { bind } from 'astal'

const notifyd = Notifyd.get_default()

const notifications: Tree = {
  type: FType.CUSTOM,
  widget: (
    <box vertical={true}>
      {bind(notifyd, 'notifications')
        .as(notifications => {
          const notifs = notifications.reduce<Tree[]>((acc, notification) => {
            function findExistingNotif() {
              return acc.findIndex(existingNotif =>
                existingNotif.type === FType.DIR &&
                  existingNotif.name === notification.get_app_name()
              )
            }

            if (findExistingNotif() === -1) {
              acc.push({
                type: FType.DIR,
                name: notification.get_app_name(),
                children: []
              })
            }

            const existingNotif = findExistingNotif()
            if (existingNotif !== -1 && acc[existingNotif].type === FType.DIR) {
              acc[existingNotif].children.push({
                type: FType.CUSTOM,
                widget: (
                  <label
                    label={
                      notification.get_app_name() === 'Spotify'
                        ? `󰝚 Playing - ${notification.get_summary()}`
                        : notification.get_summary()
                    }
                    maxWidthChars={24}
                    truncate={true}
                  />
                )
              })
            }

            return acc
          }, [])

          return createTree({
            type: FType.DIR,
            name: 'notifications',
            children: notifs
          })
        })
      }
    </box>
  )
}

export default notifications
