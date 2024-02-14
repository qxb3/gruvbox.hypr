export function createTree(structure) {
  const tree = []

  function traverse(parent, nested) {
    const keys = Object.keys(parent)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const child = parent[key]

      tree.push(
        Widget.Box({
          className: 'tree_item',
          children: [
            Widget.Box({
              setup: (self) => {
                const spaces = Widget.Label('  '.repeat(nested))

                if (child.type === 'dir') {
                  self.className = `dir ${key}`
                  self.children = [
                    spaces,
                    Widget.Label({
                      className: 'down',
                      label: ''
                    }),
                    Widget.Label({
                      className: 'text',
                      label: `${child.icon ?? ''} ${key} ${child.text ?? ''}`,
                      xalign: 0
                    })
                  ]
                }

                if (child.type === 'file') {
                  self.className = `file ${key}`
                  self.children = [
                    spaces,
                    Widget.Label({
                      className: 'text',
                      label: `${child.icon ?? ''} ${key}${' '.repeat(child.spacing ?? 1)}-> ${child.value}`,
                      xalign: 0
                    })
                  ]
                }

                if (child.type === 'widget') {
                  self.className = `widget ${key}`
                  self.children = [
                    spaces,
                    Widget.Label({
                      className: 'text',
                      label: `${child.icon ?? ''} ${key}${' '.repeat(child.spacing ?? 1)}-> `,
                      xalign: 0
                    }),
                    child.widget
                  ]
                }

                if (child.type === 'custom') {
                  self.className = `custom ${key}`
                  self.children = [
                    spaces,
                    child.child
                  ]
                }
              }
            })
          ]
        })
      )

      if (child.type === 'dir' && child.children)
        traverse(child.children, nested + 1)
    }
  }

  traverse(structure, 0)

  return tree
}
