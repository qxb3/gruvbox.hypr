import Home from './home/Home.js'
import { state } from '../../shared/utils.js'

const revealSideBar = state('reveal_sidebar', false)

function SideBar() {
  return Widget.Stack({
    transition: 'slide_left_right',
    transitionDuration: 300,
    children: {
      home: Home()
    }
  })
}

export default Widget.Window({
  name: 'sidebar',
  layer: 'top',
  exclusivity: 'exclusive',
  anchor: ['left', 'top', 'bottom'],
  margins: [0, 0, 0, -2],
  child: Widget.Box({
    css: `
      background-color: #282828;
      padding: 0.01px;
    `,
    child: Widget.Revealer({
      revealChild: revealSideBar.bind(),
      transition: 'slide_right',
      transitionDuration: 300,
      child: SideBar()
    })
  })
})
