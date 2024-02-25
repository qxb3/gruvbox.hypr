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
} from '../../../../../shared/music.js'

function MusicMeta() {
  const Title = Widget.Label({
    className: 'title',
    label: musicTitle.bind(),
    maxWidthChars: 8,
    truncate: 'end',
    justification: 'center',
    hexpand: true
  })

  const Artist = Widget.Label({
    className: 'artist',
    label: musicArtist.bind(),
    maxWidthChars: 16,
    truncate: 'end',
    justification: 'center',
    hexpand: true
  })

  return Widget.Box({
    className: 'meta',
    vertical: true,
    children: [
      Title,
      Artist
    ]
  })
}

function Controls() {
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

function Position() {
  const ProgressBar = Widget.ProgressBar({
    className: 'progress',
    value: musicPosition.bind().transform(pos => pos === 0 ? 0 : pos / musicLength.value),
    hexpand: false,
    hpack: 'center'
  })

  const CurrentProgress = Widget.Label({
    className: 'current_progress',
    label: musicPosition.bind().transform(pos => pos === 0 ? '0:00' : `${Math.floor(pos / 60)}:${String(Math.round(pos) % 60).padStart(2, '0')}`)
  })

  const Seperator = Widget.Box({
    className: 'seperator',
    vpack: 'center',
    hexpand: true,
    vexpand: false
  })

  const Length = Widget.Label({
    className: 'length',
    label: musicLength.bind().transform(length => length === 0 ? '0:00' : `${Math.floor(length / 60)}:${String(Math.round(length) % 60).padStart(2, '0')}`)
  })

  return Widget.Box({
    className: 'position',
    vertical: true,
    spacing: 4,
    children: [
      ProgressBar,
      Widget.Box({
        className: 'meta',
        spacing: 8,
        children: [
          CurrentProgress,
          Seperator,
          Length
        ]
      })
    ]
  })
}

export default function() {
  const Thumbnail = Widget.Box({
    className: 'thumbnail',
    css: musicThumbnailUrl.bind().transform(thumb => `background-image: url("${thumb}")`)
  })

  return Widget.Box({
    className: 'music_player',
    vexpand: false,
    spacing: 10,
    children: [
      Thumbnail,
      Widget.Box({
        className: 'right',
        vertical: true,
        children: [
          MusicMeta(),
          Controls(),
          Position()
        ]
      })
    ]
  })
}
