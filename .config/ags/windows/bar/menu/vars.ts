import { Variable } from 'astal'

export const time = Variable('').poll(1000, `date +'%H\n%M'`)
export const revealSysTray = Variable(false)

export const revealAudioControlsMenu = Variable(false)
export const revealSystemControlsMenu = Variable(false)
export const revealBatteryMenu = Variable(false)
export const revealCalendarMenu = Variable(false)

revealAudioControlsMenu.subscribe(value => {
  if (value) {
    revealSystemControlsMenu.set(false)
    revealBatteryMenu.set(false)
    revealCalendarMenu.set(false)
  }
})

revealSystemControlsMenu.subscribe(value => {
  if (value) {
    revealAudioControlsMenu.set(false)
    revealBatteryMenu.set(false)
    revealCalendarMenu.set(false)
  }
})

revealBatteryMenu.subscribe(value => {
  if (value) {
    revealAudioControlsMenu.set(false)
    revealSystemControlsMenu.set(false)
    revealCalendarMenu.set(false)
  }
})

revealCalendarMenu.subscribe(value => {
  if (value) {
    revealAudioControlsMenu.set(false)
    revealSystemControlsMenu.set(false)
    revealBatteryMenu.set(false)
  }
})
