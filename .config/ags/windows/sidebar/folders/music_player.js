import {
  musicStatus,
  musicTitle,
  musicArtist,
  musicAlbum,
  toggle,
  prev,
  next
} from '../../../shared/music.js'

export default {
  type: 'dir',
  children: {
    title: {
      type: 'widget',
      icon: '󰲹',
      spacing: 4,
      widget: Widget.Label({
        maxWidthChars: 15,
        truncate: 'end',
        label: musicTitle.bind()
      })
    },
    artist: {
      type: 'widget',
      icon: '󰠃',
      spacing: 3,
      widget: Widget.Label({
        maxWidthChars: 15,
        truncate: 'end',
        label: musicArtist.bind()
      })
    },
    album: {
      type: 'widget',
      icon: '󰀥',
      spacing: 4,
      widget: Widget.Label({
        maxWidthChars: 15,
        truncate: 'end',
        label: musicAlbum.bind()
      })
    },
    controls: {
      type: 'widget',
      icon: '',
      widget: Widget.Box({
        className: 'music_controls',
        spacing: 8,
        children: [
          Widget.Button({
            onPrimaryClick: () => prev(),
            child: Widget.Label({
              label: '󰒮'
            })
          }),
          Widget.Button({
            onPrimaryClick: () => toggle(),
            child: Widget.Label({
              label: musicStatus.bind().transform(s =>
                s === 'Stopped'
                  ? '󰓛'
                  : s === 'Playing'
                    ? '󰏤'
                    : '󰐊'
              )
            })
          }),
          Widget.Button({
            onPrimaryClick: () => next(),
            child: Widget.Label({
              label: '󰒭'
            })
          })
        ]
      })
    }
  }
}
