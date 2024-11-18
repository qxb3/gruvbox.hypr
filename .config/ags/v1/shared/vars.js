import { state } from './utils.js'

import {
  musicPlayerRevealer,
  audioRevealer,
  systemRevealer,
  calendarRevealer
} from '../windows/bar/menu/vars.js'

export const revealSideBar = state('reveal_sidebar', false)
revealSideBar.connect('changed', ({ value }) => {
  if (!value) {
    musicPlayerRevealer.value = false
    audioRevealer.value = false
    systemRevealer.value = false
    calendarRevealer.value = false
  }
})

export const sidebarShown = state('sidebar_shown', 'home')
