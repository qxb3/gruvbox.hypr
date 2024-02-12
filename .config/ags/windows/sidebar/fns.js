export function createTree(structure) {
  const tree = []

  function traverse(parent, nested) {
    const keys = Object.keys(parent)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const child = parent[key]

      if (child.type === 'dir') {
        tree.push(
          Widget.Box({
            className: `tree_item`,
            homogeneous: false,
            children: [
              Widget.Box({
                className: `dir ${key}`,
                children: [
                  Widget.Label('  '.repeat(nested)),
                  Widget.Label({
                    className: 'down',
                    label: ''
                  }),
                  Widget.Label({
                    className: 'text',
                    label: `${child.icon ?? ''} ${key}`,
                    xalign: 0
                  })
                ]
              })
            ]
          })
        )
      }

      if (child.type === 'file') {
        tree.push(
          Widget.Box({
            className: 'tree_item',
            children: [
              Widget.Box({
                className: `file ${key}`,
                children: [
                  Widget.Label('  '.repeat(nested)),
                  Widget.Label({
                    className: 'text',
                    label: `${child.icon ?? ''} ${key}${' '.repeat(child.spacing ?? 1)}-> ${child.value}`,
                    xalign: 0
                  })
                ]
              })
            ]
          })
        )
      }

      if (child.type === 'widget') {
        tree.push(
          Widget.Box({
            className: 'tree_item',
            children: [
              Widget.Box({
                className: `widget ${key}`,
                children: [
                  Widget.Label('  '.repeat(nested)),
                  Widget.Label({
                    className: 'text',
                    label: `${child.icon ?? ''} ${key}${' '.repeat(child.spacing ?? 1)}-> `,
                    xalign: 0
                  }),
                  child.widget
                ]
              })
            ]
          })
        )
      }

      if (child.type === 'dir' && child.children)
        traverse(child.children, nested + 1)
    }
  }

  traverse(structure, 0)

  return tree
}
