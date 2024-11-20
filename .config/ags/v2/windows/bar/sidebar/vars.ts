import { Variable } from 'astal'

import {
  revealAudioControlsMenu,
  revealSystemControlsMenu,
  revealCalendarMenu
} from '../menu/vars'

export const revealSideBar = Variable(false)
export const sideBarShown = Variable('home')

revealSideBar.subscribe((value) => {
  if (value) {
    revealAudioControlsMenu.set(false)
    revealSystemControlsMenu.set(false)
    revealCalendarMenu.set(false)
  }
})
