import {
  musicStatus,
  musicThumbnailUrl,
  musicArtist,
  musicTitle,
  musicPosition,
  musicLength,
  prev,
  toggle,
  next
} from '../../../shared/music.js'

import { musicPlayerRevealer } from './vars.js'

function MusicMeta() {
  const Player = Widget.Label({
    className: 'player',
    label: 'SPOTIFY',
    xalign: 0,
  })

  const Title = Widget.Label({
    className: 'title',
    label: musicTitle.bind(),
    maxWidthChars: 12,
    truncate: 'end',
    xalign: 0,
  })

  const Artist = Widget.Label({
    className: 'artist',
    label: musicArtist.bind(),
    maxWidthChars: 12,
    truncate: 'end',
    xalign: 0,
  })

  return Widget.Box({
    className: 'meta',
    hexpand: true,
    vertical: true,
    children: [
      Player,
      Title,
      Artist
    ]
  })
}

function Position() {
  const ProgressBar = Widget.ProgressBar({
    className: 'progress',
    value: musicPosition.bind().transform(pos => pos === 0 ? 0 : pos / musicLength.value),
    hexpand: true
  })

  return Widget.Box({
    className: 'position',
    vertical: true,
    hexpand: true,
    children: [
      ProgressBar
    ]
  })
}

function Controls() {
  const PrevButton = Widget.Button({
    className: 'prev_button control',
    cursor: 'pointer',
    onPrimaryClick: () => prev(),
    child: Widget.Label('󰒮')
  })

  const PlayButton = Widget.Button({
    className: 'play_button control',
    cursor: 'pointer',
    onPrimaryClick: () => toggle(),
    child: Widget.Label().hook(musicStatus, (self) => {
      if (musicStatus.value === 'Stopped') self.label = '󰓛'
      if (musicStatus.value === 'Playing') self.label = '󰏤'
      if (musicStatus.value === 'Paused') self.label = '󰐊'
    })
  })

  const NextButton = Widget.Button({
    className: 'next_button control',
    cursor: 'pointer',
    onPrimaryClick: () => {
      next()
      musicPlayerRevealer.value = false
    },
    child: Widget.Label('󰒭')
  })

  return Widget.Box({
    className: 'controls',
    homogeneous: true,
    spacing: 16,
    children: [
      PrevButton,
      PlayButton,
      NextButton
    ]
  })
}

export default function() {
  const Thumbnail = Widget.Box({
    className: 'thumbnail',
    hexpand: true,
    css: musicThumbnailUrl.bind().transform(thumb => `background-image: url("${thumb}")`)
  })

  return Widget.Box({
    className: 'music_player menu',
    vertical: true,
    hexpand: true,
    vexpand: false,
    children: [
      Widget.Box({
        className: 'top',
        vexpand: true,
        spacing: 16,
        children: [
          Thumbnail,
          MusicMeta(),
        ]
      }),
      Position(),
      Controls()
    ]
  })
}
