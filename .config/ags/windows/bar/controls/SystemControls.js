function SystemControls() {
  return Widget.Box({
    className: 'system_controls',
    children: [
      Widget.Label('System Controls!')
    ]
  })
}

export const SystemControlsMenu = Widget.Menu({
  children: [
    Widget.MenuItem({
      child: SystemControls()
    })
  ]
})
