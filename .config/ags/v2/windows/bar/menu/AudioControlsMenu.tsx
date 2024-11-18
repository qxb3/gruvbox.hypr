import { App, Astal, Gtk } from 'astal/gtk3'

import WPSerivce from 'gi://AstalWp'
import { bind } from 'astal'

const audio = WPSerivce.get_default()!.audio!

import { revealAudioControlsMenu } from './vars'

function AudioControlsMenu() {
  return (
    <box
      className='audio_controls_menu menu'
      spacing={8}>
      {/* Global Vol */}
      {bind(audio, 'defaultSpeaker').as(speaker => (
        <box
          className='global_vol slider_container'
          vertical={true}
          spacing={8}>
          <slider
            className={
              bind(speaker, 'mute')
                .as(isMute => isMute ?
                    'slider mute' : 'slider'
                )
            }
            value={bind(speaker, 'volume')}
            max={1.5}
            step={0.01}
            vexpand={true}
            drawValue={false}
            vertical={true}
            inverted={true}
            onDragged={({ value }) => speaker.set_volume(value)}>
          </slider>

          <label
            className='icon'
            label={
              bind(speaker, 'mute')
                .as(isMute => !isMute ? '󰕾' : '󰸈')
            }
          />
        </box>
      ))}

      {/* Music Vol */}
      <box
        className='music_vol slider_container'
        vertical={true}
        spacing={8}>
        <slider
          className='slider'
          value={0.8}
          max={1}
          step={0.01}
          vexpand={true}
          drawValue={false}
          vertical={true}
          inverted={true}>
        </slider>

        <label className='icon' label='󰎌' />
      </box>

      {/* Microphone Vol */}
      {bind(audio, 'defaultMicrophone').as(microphone => (
        <box
          className='mic_vol slider_container'
          vertical={true}
          spacing={8}
          halign={Gtk.Align.CENTER}>
          <slider
            className={
              bind(microphone, 'mute')
                .as(isMute => isMute ?
                    'slider mute' : 'slider'
                )
            }
            value={bind(microphone, 'volume')}
            max={1.5}
            step={0.01}
            vexpand={true}
            drawValue={false}
            vertical={true}
            inverted={true}
            onDragged={({ value }) => microphone.set_volume(value)}>
          </slider>

          <label
            className='icon'
            label={
              bind(microphone, 'mute')
                .as(isMute => !isMute ? '󰍬' : '󰍭')
            }
          />
        </box>
      ))}
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
        revealChild={revealAudioControlsMenu()}
        transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
        transitionDuration={300}>
        {AudioControlsMenu()}
      </revealer>
    </window>
  )
}
