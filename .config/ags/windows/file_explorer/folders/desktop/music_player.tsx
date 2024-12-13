import Mpris from 'gi://AstalMpris'
import { FType, Tree } from '@windows/file_explorer/utils'
import { bind } from 'astal'

const spotify = Mpris.Player.new('spotify')

const musicPlayer: Tree = {
  type: FType.DIR,
  name: 'music_player',
  children: [
    {
      type: FType.WIDGET,
      name: 'title',
      icon: '󰲹',
      widget: (
        <label label={bind(spotify, 'title')} />
      )
    },
    {
      type: FType.WIDGET,
      name: 'artist',
      icon: '󰠃',
      widget: (
        <label label={bind(spotify, 'artist')} />
      )
    },
    {
      type: FType.WIDGET,
      name: 'album',
      icon: '󰀥',
      widget: (
        <label label={bind(spotify, 'album')} />
      )
    },
    {
      type: FType.WIDGET,
      name: 'controls',
      icon: '',
      widget: (
        <box
          className='music_controls'
          spacing={8}>
          <button
            cursor='pointer'
            onClick={() => spotify.previous()}>
            <label label='󰒮' />
          </button>

          <button
            cursor='pointer'
            onClick={() => spotify.play_pause()}>
            <label
              label={
                bind(spotify, 'playbackStatus')
                  .as(status =>
                    status === Mpris.PlaybackStatus.STOPPED
                      ? '󰓛'
                      : status === Mpris.PlaybackStatus.PLAYING
                        ? '󰏤' : '󰐊'
                  )
              }
            />
          </button>

          <button
            cursor='pointer'
            onClick={() => spotify.next()}>
            <label label='󰒭' />
          </button>
        </box>
      )
    }
  ]
}

export default musicPlayer
