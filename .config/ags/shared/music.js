const MprisService = await Service.import('mpris')

export const PLAYERS = ['spotify'/*, 'firefox'*/]
export const NO_MUSIC = `${App.configDir}/assets/no-music.png`

export const musicPlayer = Variable()
export const musicStatus = Variable('Stopped')
export const musicThumbnail = Variable(NO_MUSIC)
export const musicThumbnailUrl = Variable(NO_MUSIC)
export const musicTitle = Variable('No Music')
export const musicArtist = Variable('Artist')
export const musicAlbum = Variable('Album')
export const musicVolume = Variable(0)
export const musicPosition = Variable(0)
export const musicLength = Variable(0)

MprisService.connect('player-changed', () => {
  const player = MprisService.players
    .filter(p => PLAYERS.includes(p.name))
    .sort((a, b) => PLAYERS.indexOf(a.name) - PLAYERS.indexOf(b.name))[0]

  let posInterval = null

  if (!player) {
    musicStatus.value = 'Stopped'
    musicThumbnail.value = NO_MUSIC
    musicThumbnailUrl.value = NO_MUSIC
    musicTitle.value = 'No Music'
    musicArtist.value = 'Artist'
    musicAlbum.value = 'Album'
    musicVolume.value = 0
    musicPosition.value = 0
    musicLength.value = 0

    clearInterval(posInterval)
    posInterval = null
  }

  player?.connect('changed', () => {
    musicPlayer.value = player

    if (player.name === 'spotify') {
      musicStatus.value = player.playBackStatus
      musicThumbnail.value = player.coverPath || NO_MUSIC
      musicThumbnailUrl.value = player.trackCoverUrl || NO_MUSIC
      musicTitle.value = player.trackTitle || 'No Music'
      musicArtist.value = player.trackArtists.join(', ') || 'Artist'
      musicAlbum.value = player.trackAlbum || 'Album'
      musicVolume.value = parseFloat(player.volume) || 0
      musicLength.value = player.length || 0

      clearInterval(posInterval)
      posInterval = setInterval(() => {
        musicPosition.value = player.position
      }, 1000)
    }

    // if (player.name === 'firefox') {
    //   musicTitle.value = player.trackTitle
    //   musicArtist.value = player.trackArtists.join(', ') || 'Album'
    //   musicPosition.value = 0
    //   musicLength.value = player.length
    // }
  })
})

export function toggle() {
  if (!musicPlayer.value) return

  musicPlayer.value.playPause()
}

export function play() {
  if (musicStatus.value === 'Stopped') return

  musicPlayer.value.play()
}

export function pause() {
  if (musicStatus.value === 'Stopped') return

  musicPlayer.value.stop()
}

export function next() {
  if (musicStatus.value === 'Stopped') return

  musicPlayer.value.next()
}

export function prev() {
  if (musicStatus.value === 'Stopped') return

  musicPlayer.value.previous()
}

export function setVolume(volume) {
  if (volume === undefined) throw new Error('"volume" is undefined')

  Utils.exec(`playerctl -p ${PLAYERS} volume ${volume}`)
}

export default {
  player: musicPlayer,
  musicStatus,
  musicTitle,
  musicArtist,
  musicAlbum
}
