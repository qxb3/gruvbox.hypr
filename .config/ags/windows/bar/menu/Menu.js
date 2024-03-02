import AudioControls from './AudioControls.js'
import SystemControls from './SystemControls.js'
import Calendar from './Calendar.js'

const audioRevealer = Variable(false)
const systemRevealer = Variable(false)
const calendarRevealer = Variable(false)

export default function(control) {
  if (control === undefined) throw new Error('"control" is undefined.')

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
        systemRevealer.value = false
        calendarRevealer.value = false
        audioRevealer.value = !audioRevealer.value
      },
      open: () => {
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
        audioRevealer.value = false
        calendarRevealer.value = false
        systemRevealer.value = !systemRevealer.value
      },
      open: () => {
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
        audioRevealer.value = false
        systemRevealer.value = false
        calendarRevealer.value = !calendarRevealer.value
      },
      open: () => {
        audioRevealer.value = false
        systemRevealer.value = false
        calendarRevealer.value = true
      },
      close: () => calendarRevealer.value = false
    }
  }
}
