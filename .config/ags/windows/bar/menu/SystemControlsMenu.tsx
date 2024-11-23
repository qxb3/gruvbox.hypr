import BrightnessService from '@services/BrightnessService'

import { App, Astal, Gtk } from 'astal/gtk3'
import { bind } from 'astal'

const brightness = new BrightnessService()

import { revealSystemControlsMenu } from './vars'

function SystemControlsMenu() {
  return (
    <box
      className='system_controls_menu menu'
      spacing={8}>
      <box
        className='brightness slider_container'
        halign={Gtk.Align.CENTER}
        vertical={true}
        spacing={8}>
        <slider
          className='slider'
          cursor='pointer'
          value={bind(brightness, 'brightness')}
          drawValue={false}
          vexpand={true}
          vertical={true}
          inverted={true}
          onDragged={({ value }) => {
            brightness.brightness = value
          }}>
        </slider>

        <label
          className='icon'
          label=''
        />
      </box>
    </box>
  )
}

export default function() {
  return (
    <window
      namespace='menu'
      layer={Astal.Layer.OVERLAY}
      anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
      setup={(self) => App.add_window(self)}>
      <revealer
        revealChild={revealSystemControlsMenu()}
        transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
        transitionDuration={ANIMATION_SPEED}>
        <SystemControlsMenu />
      </revealer>
    </window>
  )
}
