import MusicPlayer from './MusicPlayer.js'
import AudioControls from './AudioControls.js'
import SystemControls from './SystemControls.js'
import Calendar from './Calendar.js'

import {
  musicPlayerRevealer,
  audioRevealer,
  systemRevealer,
  calendarRevealer
} from './vars.js'

export default function(control) {
  if (control === undefined) throw new Error('"control" is undefined.')

  if (control === 'musicPlayer') {
    App.addWindow(Widget.Window({
      name: 'music_player',
      layer: 'overlay',
      anchor: ['bottom', 'left'],
      child: Widget.Box({
        css: `padding: 0.1px;`,
        child: Widget.Revealer({
          revealChild: musicPlayerRevealer.bind(),
          transition: 'slide_right',
          transitionDuration: 300,
          child: MusicPlayer()
        })
      })
    }))

    return {
      toggle: () => {
        musicPlayerRevealer.value = !musicPlayerRevealer.value
        systemRevealer.value = false
        calendarRevealer.value = false
        audioRevealer.value = false
      },
      open: () => {
        musicPlayerRevealer.value = true
        systemRevealer.value = false
        calendarRevealer.value = false
        audioRevealer.value = false
      },
      close: () => musicPlayerRevealer.value = false
    }
  }

  if (control === 'audio') {
    App.addWindow(Widget.Window({
      name: 'audio_controls',
      layer: 'overlay',
      anchor: ['bottom', 'left'],
      child: Widget.Box({
        css: `padding: 0.1px;`,
        child: Widget.Revealer({
          revealChild: audioRevealer.bind(),
          transition: 'slide_right',
          transitionDuration: 300,
          child: AudioControls()
        })
      })
    }))

    return {
      toggle: () => {
        musicPlayerRevealer.value = false
        systemRevealer.value = false
        calendarRevealer.value = false
        audioRevealer.value = !audioRevealer.value
      },
      open: () => {
        musicPlayerRevealer.value = false
        systemRevealer.value = false
        calendarRevealer.value = false
        audioRevealer.value = true
      },
      close: () => audioRevealer.value = false
    }
  }

  if (control === 'system') {
    App.addWindow(Widget.Window({
      name: 'system_controls',
      layer: 'overlay',
      anchor: ['bottom', 'left'],
      child: Widget.Box({
        css: `padding: 0.1px;`,
        child: Widget.Revealer({
          revealChild: systemRevealer.bind(),
          transition: 'slide_right',
          transitionDuration: 300,
          child: SystemControls()
        })
      })
    }))

    return {
      toggle: () => {
        musicPlayerRevealer.value = false
        audioRevealer.value = false
        calendarRevealer.value = false
        systemRevealer.value = !systemRevealer.value
      },
      open: () => {
        musicPlayerRevealer.value = false
        audioRevealer.value = false
        calendarRevealer.value = false
        systemRevealer.value = true
      },
      close: () => audioRevealer.value = false
    }
  }

  if (control === 'calendar') {
    App.addWindow(Widget.Window({
      name: 'calendar',
      layer: 'overlay',
      anchor: ['bottom', 'left'],
      child: Widget.Box({
        css: `padding: 0.1px;`,
        child: Widget.Revealer({
          revealChild: calendarRevealer.bind(),
          transition: 'slide_right',
          transitionDuration: 300,
          child: Calendar()
        })
      })
    }))

    return {
      toggle: () => {
        musicPlayerRevealer.value = false
        audioRevealer.value = false
        systemRevealer.value = false
        calendarRevealer.value = !calendarRevealer.value
      },
      open: () => {
        musicPlayerRevealer.value = false
        audioRevealer.value = false
        systemRevealer.value = false
        calendarRevealer.value = true
      },
      close: () => calendarRevealer.value = false
    }
  }
}
