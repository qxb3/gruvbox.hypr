import MprisService from 'gi://AstalMpris'

import { Gtk } from 'astal/gtk3'
import { bind } from 'astal'

import ProgressBar from '../../../../../widgets/ProgressBar'

const spotify = MprisService.Player.new('spotify')

interface MusicComponentProps {
  available: boolean
}

function MusicCover({ available }: MusicComponentProps) {
  return (
    <box
      className='cover'
      css={
        bind(spotify, 'coverArt')
        .as(cover => available ?
          `background-image: url("${cover}");` :
          `background-image: url("${SRC}/assets/no-music.png");`
        )
      }
    />
  )
}

function MusicMeta({ available }: MusicComponentProps) {
  return (
    <box
      className='meta'
      vertical={true}
      vexpand={true}>
      {/* Music Title */}
      <label
        className='title'
        label={
          bind(spotify, 'title')
            .as(title => available ? title : 'No Music')
        }
        maxWidthChars={8}
        truncate={true}
        justify={Gtk.Justification.CENTER}
        hexpand={true}
      />

      {/* Music Artist */}
      <label
        className='artist'
        label={
          bind(spotify, 'artist')
            .as(artist => available ? artist : 'Artist')
        }
        maxWidthChars={16}
        truncate={true}
        justify={Gtk.Justification.CENTER}
        hexpand={true}
      />
    </box>
  )
}

function MusicControls({ available: _ }: MusicComponentProps) {
  return (
    <box
      className='controls'
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.END}
      spacing={16}>
      {/* Prev */}
      <button
        className='prev control'
        cursor='pointer'
        onClick={() => spotify.previous()}>
        <label label='󰒮' />
      </button>

      {/* Toggle */}
      <button
        className='toggle control'
        cursor='pointer'
        onClick={() => spotify.play_pause()}>
        <label
          label={
            bind(spotify, 'playbackStatus')
              .as(status => {
                switch (status) {
                  case MprisService.PlaybackStatus.STOPPED:
                    return '󰓛'
                  case MprisService.PlaybackStatus.PAUSED:
                    return '󰐊'
                  case MprisService.PlaybackStatus.PLAYING:
                    return '󰏤'
                }
              })
          }
        />
      </button>

      {/* Next */}
      <button
        className='prev control'
        cursor='pointer'
        onClick={() => spotify.next()}>
        <label label='󰒭' />
      </button>
    </box>
  )
}

function MusicPosition({ available }: MusicComponentProps) {
  return (
    <box
      className='position'
      vertical={true}
      spacing={4}>
      {/* Progress */}
      {bind(spotify, 'length').as(length => (
        <ProgressBar
          className='progress'
          fraction={
            bind(spotify, 'position')
            .as(position => position / length)
          }
          hexpand={false}
          halign={Gtk.Align.CENTER}
        />
      ))}

      {/* Meta */}
      <box
        className='meta'
        spacing={8}>
        {/* Current Progress */}
        <label
          className='current_progress'
          label={
            bind(spotify, 'position')
              .as(position =>
                position <= 0
                  ? '0:00'
                  : `${Math.floor(spotify.get_length() / 60)}:${String(Math.round(position) % 60).padStart(2, '0')}`
              )
          }
        />

        {/* Seperator */}
        <box
          className='seperator'
          valign={Gtk.Align.CENTER}
          hexpand={true}
        />

        {/* Length */}
        <label
          className='current_progress'
          label={
            bind(spotify, 'length')
              .as(length =>
                !available
                  ? '0:00'
                  : `${Math.floor(spotify.get_length() / 60)}:${String(Math.round(length) % 60).padStart(2, '0')}`
              )
          }
        />
      </box>
    </box>
  )
}

export default function() {
  return (
    <box
      className='music_player'
      vexpand={false}>
      {bind(spotify, 'available').as(available => (
        <box spacing={10}>
          <MusicCover available={available} />

          <box
            className='right'
            vertical={true}>
            <MusicMeta available={available} />
            <MusicControls available={available} />
            <MusicPosition available={available} />
          </box>
        </box>
      ))}
    </box>
  )
}
