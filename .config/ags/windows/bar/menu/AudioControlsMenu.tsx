import { App, Astal, Gtk } from 'astal/gtk3'

import WPSerivce from 'gi://AstalWp'
import MprisService from 'gi://AstalMpris'
import { bind } from 'astal'

import { revealAudioControlsMenu } from './vars'
import { sideBarWidth } from '@windows/bar/sidebar/vars'

const audio = WPSerivce.get_default()!.audio!
const spotify = MprisService.Player.new('spotify')

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
            cursor='pointer'
            value={bind(speaker, 'volume')}
            max={1.5}
            step={0.01}
            vexpand={true}
            drawValue={false}
            vertical={true}
            inverted={true}
            onDragged={({ value }) => speaker.set_volume(value)}>
          </slider>

          <button
            cursor='pointer'
            onClick={() => speaker.set_mute(!speaker.get_mute())}>
            <label
              className='icon'
              label={
                bind(speaker, 'mute')
                  .as(isMute => !isMute ? '󰕾' : '󰸈')
              }
            />
          </button>
        </box>
      ))}

      {/* Music Vol */}
      <box
        className='music_vol slider_container'
        vertical={true}
        spacing={8}>
        <slider
          className='slider'
          cursor='pointer'
          value={bind(spotify, 'volume')}
          max={1}
          step={0.01}
          vexpand={true}
          drawValue={false}
          vertical={true}
          inverted={true}
          onDragged={({ value }) => spotify.set_volume(value)}>
        </slider>

        <button
          cursor='pointer'
          onClick={() => spotify.set_volume(spotify.get_volume() <= 0 ? 100 : 0)}>
          <label
            className='icon'
            label={
              bind(spotify, 'volume')
                .as(volume => volume <= 0 ? '󰎊' : '󰎌')
            }
          />
        </button>
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
                .as(isMute => isMute ? 'slider mute' : 'slider')
            }
            cursor='pointer'
            value={bind(microphone, 'volume')}
            max={1.5}
            step={0.01}
            vexpand={true}
            drawValue={false}
            vertical={true}
            inverted={true}
            onDragged={({ value }) => microphone.set_volume(value)}>
          </slider>

          <button
            cursor='pointer'
            onClick={() => microphone.set_mute(!microphone.get_mute())}>
            <label
              className='icon'
              label={
                bind(microphone, 'mute')
                  .as(isMute => !isMute ? '󰍬' : '󰍭')
              }
            />
          </button>
        </box>
      ))}
    </box>
  )
}

export default function() {
  return (
    <window
      namespace='menu'
      layer={Astal.Layer.TOP}
      anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
      setup={(self) => App.add_window(self)}>
      <box css={sideBarWidth(width => `margin-left: ${width}px;`)}>
        <revealer
          revealChild={revealAudioControlsMenu()}
          transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
          transitionDuration={ANIMATION_SPEED}>
          <AudioControlsMenu />
        </revealer>
      </box>
    </window>
  )
}
