import { App, Astal, Gdk } from 'astal/gtk3'

export default function(props: { gdkmonitor: Gdk.Monitor, anchor: Astal.WindowAnchor}) {
  const { gdkmonitor, anchor } = props

  return (
    <window
      namespace='block'
      application={App}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      layer={Astal.Layer.TOP}
      anchor={anchor}>
      <box className='block' />
    </window>
  )
}
