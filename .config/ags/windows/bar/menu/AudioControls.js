import { musicVolume, setVolume } from '../../../shared/music.js'

const AudioService = await Service.import('audio')

export default function() {
  const GlobalVolume = Widget.Box({
    className: 'global_volume slider_container',
    vertical: true,
    spacing: 8,
    children: [
      Widget.Slider({
        className: 'slider',
        value: AudioService.speaker.bind('volume'),
        onChange: ({ value }) => AudioService.speaker.volume = value,
        drawValue: false,
        vexpand: true,
        vertical: true,
        inverted: true
      }),
      Widget.Label({
        className: 'icon',
        label: '󰕾'
      })
    ]
  })

  const MusicVolume = Widget.Box({
    className: 'music_volume slider_container',
    vertical: true,
    spacing: 8,
    children: [
      Widget.Slider({
        className: 'slider',
        value: musicVolume.bind(),
        onChange: ({ value }) => setVolume(value),
        drawValue: false,
        vexpand: true,
        vertical: true,
        inverted: true
      }),
      Widget.Label({
        className: 'icon',
        label: '󰎌'
      })
    ]
  })

  const InputVolume = Widget.Box({
    className: 'input_volume slider_container',
    vertical: true,
    spacing: 8,
    children: [
      Widget.Slider({
        className: 'slider',
        value: AudioService.microphone.bind('volume'),
        onChange: ({ value }) => AudioService.microphone.volume = value,
        drawValue: false,
        vexpand: true,
        vertical: true,
        inverted: true
      }),
      Widget.Label({
        className: 'icon',
        label: '󰍬'
      })
    ]
  })

  return Widget.Box({
    className: 'audio_controls menu',
    spacing: 8,
    children: [
      GlobalVolume,
      MusicVolume,
      InputVolume
    ]
  })
}
