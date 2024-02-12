import Mpris from 'resource:///com/github/Aylur/ags/service/mpris.js'

export const player = Variable()
export const musicStatus = Variable('')
export const musicTitle = Variable('No Music')
export const musicArtist = Variable('Artist')
export const musicAlbum = Variable('Album')

Mpris.connect('changed', () => {
  const spotifyPlayer = Mpris.players.find(player => player.name === 'spotify')
  if (!spotifyPlayer) {
    musicStatus.value = 'Stopped'
    musicTitle.value = 'No Music'
    musicArtist.value = 'Artist'
    musicAlbum.value = 'Album'
  }

  spotifyPlayer?.connect('changed', () => {
    player.value = spotifyPlayer

    musicStatus.value = spotifyPlayer.playBackStatus
    musicTitle.value = spotifyPlayer.trackTitle
    musicArtist.value = spotifyPlayer.trackArtists.join(', ') || 'Album'
    musicAlbum.value = spotifyPlayer.trackAlbum
  })
})

export function toggle() {
  if (musicStatus === 'Stopped') return

  player.value.playPause()
}

export function play() {
  if (musicStatus === 'Stopped') return

  player.value.play()
}

export function pause() {
  if (musicStatus === 'Stopped') return

  player.value.stop()
}

export function next() {
  if (musicStatus === 'Stopped') return

  player.value.next()
}

export function prev() {
  if (musicStatus === 'Stopped') return

  player.value.previous()
}

export default {
  player,
  musicStatus,
  musicTitle,
  musicArtist,
  musicAlbum
}
