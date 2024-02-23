import {
  musicStatus,
  musicThumbnailUrl,
  musicArtist,
  musicTitle,
  prev,
  toggle,
  next
} from '../../../shared/music.js'

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
    hpack: 'end',
    onPrimaryClick: () => prev(),
    child: Widget.Label('󰒮')
  })

  const PlayButton = Widget.Button({
    className: 'play_button control',
    hpack: 'center',
    onPrimaryClick: () => toggle(),
    child: Widget.Label().hook(musicStatus, (self) => {
      if (musicStatus.value === 'Stopped') self.label = '󰓛'
      if (musicStatus.value === 'Playing') self.label = '󰏤'
      if (musicStatus.value === 'Paused') self.label = '󰐊'
    })
  })

  const NextButton = Widget.Button({
    className: 'next_button control',
    hpack: 'start',
    onPrimaryClick: () => next(),
    child: Widget.Label('󰒭')
  })

  return Widget.CenterBox({
    className: 'controls',
    vpack: 'end',
    vexpand: true,
    spacing: 20,
    startWidget: PrevButton,
    centerWidget: PlayButton,
    endWidget: NextButton
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
    spacing: 8,
    children: [
      Thumbnail,
      Widget.Box({
        className: 'right',
        vertical: true,
        children: [
          MusicMeta(),
          Controls()
        ]
      })
    ]
  })
}
