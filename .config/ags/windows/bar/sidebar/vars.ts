import { Variable } from 'astal'

import {
  revealAudioControlsMenu,
  revealSystemControlsMenu,
  revealBatteryMenu,
  revealCalendarMenu
} from '../menu/vars'

export const revealSideBar = Variable(false)
export const sideBarShown = Variable('home')
export const sideBarWidth = Variable(0)

revealSideBar.subscribe((value) => {
  if (value) {
    revealAudioControlsMenu.set(false)
    revealSystemControlsMenu.set(false)
    revealBatteryMenu.set(false)
    revealCalendarMenu.set(false)
  }

  if (!value) {
    sideBarShown.set('home')
  }
})
