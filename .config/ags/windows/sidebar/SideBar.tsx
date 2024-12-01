import Hyprland from 'gi://AstalHyprland'

import { App, Astal, Gdk, Gtk } from 'astal/gtk3'
import { bind, exec, Variable } from 'astal'

const hyprland = Hyprland.get_default()

const timeCommand = `date +'%I%M'`
const time = Variable<string>(mapTimeToJP(exec(timeCommand)))
  .poll(1000, timeCommand, (time) => mapTimeToJP(time))

function mapTimeToJP(time: string): string {
  return time.split('').map(char => {
    switch(char) {
      case '0': return '〇'
      case '1': return '一'
      case '2': return '二'
      case '3': return '三'
      case '4': return '四'
      case '5': return '五'
      case '6': return '六'
      case '7': return '七'
      case '8': return '八'
      case '9': return '九'
      default: return ''
    }
  }).join('')
}

function Text(props: { text: string }) {
  const { text } = props

  return text.split('').map((char) => (
    <box className='box'>
      <label
        label={char}
        hexpand
      />
    </box>
  ))
}

function Filler(props: { count: number }) {
  const { count } = props

  return Array.from({ length: count }).map(() =>
    Text({ text: ' ' })
  )
}

function SideBar() {
  return (
    <box
      className='sidebar'
      valign={Gtk.Align.CENTER}>
      <box
        className='container'
        spacing={8}
        vexpand={false}>
        <box vertical>
          {Text({ text: '一二三四五六七八' })}
          {Filler({ count: 4 })}
          {bind(time).as(time =>
            Text({ text: time })
          )}
        </box>

        <box vertical>
          {Array.from({ length: 8 }).map((_, id) =>
            bind(hyprland, 'focusedWorkspace').as(workspace =>
              (<box className='box'>
                <label
                  label={id === workspace.get_id() - 1 ? '' : ''}
                  hexpand
                />
              </box>)
              // (workspace.get_id() - 1) === id
              //   ? Text({ text: '' })
              //   : Text({ text: ' ' })
            )
          )}
          {Filler({ count: 8 })}
        </box>

        <box vertical>
          {Text({ text: 'リラックス すべて大丈夫です' })}
          {Filler({ count: 2 })}
        </box>
      </box>
    </box>
  )
}

export default function(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      namespace='sidebar'
      application={App}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      layer={Astal.Layer.TOP}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}>
      <SideBar />
    </window>
  )
}
