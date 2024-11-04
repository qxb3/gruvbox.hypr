function Bar() {
  return Widget.Box({
    className: 'bar',
    children: [
      Widget.Label('N O T E P A D')
    ]
  })
}

export default Widget.Window({
  name: 'bar',
  layer: 'top',
  exclusivity: 'exclusive',
  anchor: ['left', 'bottom', 'right'],
  child: Bar()
})
