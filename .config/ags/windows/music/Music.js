import Gtk from 'gi://Gtk'

import {
  musicStatus,
  musicThumbnailUrl,
  musicTitle
} from '../../shared/music.js'

function Thumbnail() {
  return Widget.Box({
    className: 'thumbnail',
    css: musicThumbnailUrl
          .bind()
          .transform(thumbnail => `background-image: url("${thumbnail}");`)
  })
}

function MusicMeta() {
  const MusicName = Widget.Label({
    className: 'name',
    label: musicTitle.bind(),
    justification: 'center',
    maxWidthChars: 14,
    truncate: 'end',
    wrap: true,
  })

  return Widget.Box({
    className: 'meta',
    hexpand: true,
    hpack: 'center',
    children: [
      MusicName
    ]
  })
}

function MusicControls() {
  const PrevButton = Widget.Button({
    className: 'prev_button control',
    onPrimaryClick: () => prev(),
    child: Widget.Label('󰒮')
  })

  const PlayButton = Widget.Button({
    className: 'play_button control',
    onPrimaryClick: () => toggle(),
    child: Widget.Label().hook(musicStatus, (self) => {
      if (musicStatus.value === 'Stopped') self.label = '󰓛'
      if (musicStatus.value === 'Playing') self.label = '󰏤'
      if (musicStatus.value === 'Paused') self.label = '󰐊'
    })
  })

  const NextButton = Widget.Button({
    className: 'next_button control',
    onPrimaryClick: () => next(),
    child: Widget.Label('󰒭')
  })

  return Widget.Box({
    className: 'controls',
    hpack: 'center',
    vpack: 'end',
    vexpand: true,
    spacing: 16,
    children: [
      PrevButton,
      PlayButton,
      NextButton
    ]
  })
}

function Music() {
  return Widget.Box({
    className: 'music',
    vertical: true,
    spacing: 10,
    children: [
      Thumbnail(),
      MusicMeta(),
      MusicControls()
    ]
  })
}

export default new Gtk.Window({
  title: 'Music Player',
  default_width: 30,
  default_height: 100,
  child: Music()
})
